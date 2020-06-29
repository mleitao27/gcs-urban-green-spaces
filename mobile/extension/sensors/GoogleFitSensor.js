import React, { useEffect, useState } from 'react';
import { View } from 'react-native';

import config from '../config';
import * as Google from 'expo-google-app-auth';

import googleActivities from './googleActivities.json';

const GoogleFitSensor = props => {

  const [stop, setStop] = useState(false);

  useEffect(() => {

    if (stop === false)
      googleResponse();

  }, []);

  const processTimeInterval = (value) => {
    if (isNaN(value) || typeof value === 'undefined' || value === null || value === true || value === false || value === '') {
      return 0;
    }
    else return parseInt(value);
  };

  const googleResponse = async () => {
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
        const startHours = processTimeInterval(props.config.timeInterval.hours);
        const startMinutes = processTimeInterval(props.config.timeInterval.minutes);
        const startSeconds = processTimeInterval (props.config.timeInterval.seconds);
        const startTime = now.getTime() - (startHours*60*60 + startMinutes*60 + startSeconds) * 1000;

        let dataTypeName;
        let dataSourceId;
        let varType;
        let final = [];
        let valid = true;
        let finalValue;
        let sourceData;
        let size;

        let res = await fetch(`https://www.googleapis.com/fitness/v1/users/me/dataSources`, {
          method: 'GET',
          headers: { Authorization: `Bearer ${accessToken}` }
        });

        const dataSources = await res.json();

        if (dataSources.dataSource.length === 0) {
          props.onChange(props.pageIndex, props.index, { sensor: 'googlefit', data: null });
        } else {

          props.config.data.map(async data => {

            if (data === 'steps') {
              dataTypeName = 'com.google.step_count.delta';
              varType = 'intVal';
            }
            else if (data === 'distance') {
              dataTypeName = 'com.google.distance.delta';
              varType = 'fpVal';
            }
            else if (data === 'calories') {
              dataTypeName = 'com.google.calories.expended';
              varType = 'fpVal';
            }
            else if (data === 'activeMinutes') {
              dataTypeName = 'com.google.active_minutes';
              varType = 'intVal';
            }
            else if (data === 'activity') {
              dataTypeName = 'com.google.activity.segment';
              varType = 'intVal';
            }
            else {
              valid = false;
            }

            dataSourceId = getDataSources(dataSources.dataSource, `derived:${dataTypeName}`);
            
            sourceData = await getData(data, accessToken, now, dataTypeName, dataSourceId, varType, valid, startTime);

            if (sourceData[0].data.type === 'activity') finalValue = [];
            else finalValue = 0;

            size = 0;

            for (let t of sourceData) {
              if (t.data.value !== null) {
                for (let v of t.data.value) {
                  if (sourceData[0].data.type === 'activity') {
                    finalValue = [];
                    if (v[t.varType] < 122) finalValue.push(googleActivities[v[t.varType]]);
                  } else {
                    finalValue = finalValue + v[t.varType];
                    size = size + 1;
                  }
                }
              }
            }

            sourceData[0].data.value = sourceData[0].data.type === 'activity' ? finalValue : finalValue/size;
            final.push(sourceData[0].data);

            if (final.length === props.config.data.length) {
              props.onChange(props.pageIndex, props.index, { sensor: 'googlefit', data: final });
              setStop(true);
            }
          });
        }
      } else {
        // If user closes pop up window
        // console.log("cancelled");
        props.onChange(props.pageIndex, props.index, { sensor: 'googlefit', data: null });
      }
    } catch (e) {
      // Session errors
      // console.log("error", e);
      props.onChange(props.pageIndex, props.index, { sensor: 'googlefit', data: null });
    }
  };

  const getDataSources = (sources, mySource) => {

    let finalSources = [];

    sources.map(source => {
      if (source.dataStreamId.search(mySource) !== -1) finalSources.push(source.dataStreamId);
    });

    return finalSources;
  };

  const getData = async (metric, accessToken, now, dataTypeName, dataSourceId, varType, valid, startTime) => {

    let data;

    if (valid === false) return { data: { type: metric, value: null }, varType };
    
    if (dataSourceId.length > 0) {

      data = await Promise.all(dataSourceId.map(async (source) => {

        const res = await fetch(`https://www.googleapis.com/fitness/v1/users/me/dataset:aggregate`, {
          method: 'POST',
          headers: { Authorization: `Bearer ${accessToken}` },
          body: JSON.stringify({
            "aggregateBy": [{
              "dataTypeName": dataTypeName,
              "dataSourceId": source
            }],
            "bucketByTime": { "durationMillis": now.getTime() - startTime },
            "startTimeMillis": startTime,
            "endTimeMillis": now.getTime()
          })
        });
        
        const sources = await res.json();
        if (res.status === 200) {
          if (typeof sources.error === 'undefined') return { data: checkMetric(metric, sources, varType), varType };
          else return { data: { type: metric, value: null }, varType }; 
        }
        else return { data: { type: metric, value: null }, varType };
      }));
    }
      
      return data;
  };

  const checkMetric = (metric, sources, varType) => {

    if (sources.bucket.length === 0) return { type: metric, value: null };
    else if (sources.bucket[0].dataset.length === 0) return { type: metric, value: null };
    else if (sources.bucket[0].dataset[0].point.length === 0) return { type: metric, value: null };
    else if (sources.bucket[0].dataset[0].point[0].value.length === 0) return { type: metric, value: null };
    else return { type: metric, value: sources.bucket[0].dataset[0].point[0].value };
  };

  return <View />;
};

export default GoogleFitSensor;