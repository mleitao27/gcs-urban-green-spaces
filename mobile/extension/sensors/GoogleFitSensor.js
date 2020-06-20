import React, { useEffect, useState } from 'react';
import { View, Text, Button } from 'react-native';

import config from '../config';
import * as Google from 'expo-google-app-auth';

const GoogleFitSensor = props => {

    const [stop, setStop] = useState(false);

    useEffect(() => {

      if (stop === false)
        googleResponse();

    }, []);

    const googleResponse = async() => {
        try {
          const { type, accessToken, user } = await Google.logInAsync({
            androidClientId: config.credentials.google.androidClientId,
            iosClientId: config.credentials.google.iosClientId,
            scopes: [
                "profile",
                "email",
                "https://www.googleapis.com/auth/fitness.activity.read", 
                "https://www.googleapis.com/auth/fitness.activity.write",
                "https://www.googleapis.com/auth/fitness.location.read",
                "https://www.googleapis.com/auth/fitness.location.write"
            ]
          })
          if (type === "success") {

            const now = new Date();
            
            let dataTypeName;
            let dataSourceId;
            let varType;
            let final = [];
            let valid = true;

            let res = await fetch(`https://www.googleapis.com/fitness/v1/users/me/dataSources`, {
              method: 'GET',
              headers: { Authorization: `Bearer ${accessToken}` }
            });

            const dataSources = await res.json();

            //console.log(res.status);

            if (dataSources.dataSource.length === 0) {
              props.onChange(props.pageIndex, props.index, {sensor: 'googlefit', data: 'empty'});
            } else {
              //dataSources.dataSource.map(source => console.log(source.dataStreamId));

              props.config.data.map(async data => {
  
                if (data === 'steps') {
                  dataTypeName = 'com.google.step_count.delta';
                  dataSourceId = 'derived:com.google.step_count.delta:com.google.android.gms:estimated_steps';
                  varType = 'intVal';
                }
                else if (data === 'distance') {
                  dataTypeName = 'com.google.distance.delta';
                  dataSourceId = 'derived:com.google.distance.delta:com.google.android.gms:from_steps<-merge_step_deltas';
                  varType = 'fpVal';
                }
                else if (data === 'calories') {
                  dataTypeName = 'com.google.calories.expended';
                  dataSourceId = 'derived:com.google.calories.expended:com.google.android.gms:merge_calories_expended';
                  varType = 'fpVal';
                }
                else if (data === 'activeMinutes') {
                  dataTypeName = 'com.google.active_minutes';
                  dataSourceId = 'derived:com.google.active_minutes:com.google.android.gms:from_steps<-estimated_steps';
                  varType = 'intVal';
                } 
                else {
                  valid = false;
                }

                final.push(await getData(data, accessToken, now, dataTypeName, dataSourceId, varType, valid));
              
                if (final.length === props.config.data.length) {
                  props.onChange(props.pageIndex, props.index, {sensor: 'googlefit', data: final});
                  setStop(true);
                }  
              });
            }
          } else {
            // If user closes pop up window
            console.log("cancelled");
            props.onChange(props.pageIndex, props.index, {sensor: 'googlefit', data: 'cancelled'});
          }
        } catch (e) {
          // Session errors
          console.log("error", e);
          props.onChange(props.pageIndex, props.index, {sensor: 'googlefit', data: 'error'});
        }
      };

      const getData = async (data, accessToken, now, dataTypeName, dataSourceId, varType, valid) => {
        if (valid === false) return {type: data, value: 'undefined'};
        let res = await fetch(`https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`, {
            method: 'POST',
            headers: { Authorization: `Bearer ${accessToken}` },
            body: JSON.stringify({
                "aggregateBy": [{
                  "dataTypeName": dataTypeName,
                  "dataSourceId": dataSourceId
                }],
                "bucketByTime": { "durationMillis": now.getTime() - (now.getTime()-24*60*60*1000) },
                "startTimeMillis": now.getTime()-24*60*60*1000,
                "endTimeMillis": now.getTime()
              })
        });

        const sources = await res.json();
        
        if (res.status === 200) return checkMetric(data, sources, varType);
        else return {type: data, value: 'unauthorized'};

      };

      const checkMetric = (metric, sources, varType) => {        
        if (sources.bucket.length === 0) return {type: metric, value: ''};
        else if (sources.bucket[0].dataset.length === 0) return {type: metric, value: ''};
        else if (sources.bucket[0].dataset[0].point.length === 0) return {type: metric, value: ''};
        else if (sources.bucket[0].dataset[0].point[0].value.length === 0) return {type: metric, value: ''};
        else return {type: metric, value: sources.bucket[0].dataset[0].point[0].value[0][varType]};
      };

    return <View />;
};

export default GoogleFitSensor;