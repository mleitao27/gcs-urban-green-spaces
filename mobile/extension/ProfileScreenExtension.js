import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert, StyleSheet, Dimensions } from 'react-native';

import config from './config';

import {Form} from 'react-native-json-forms';
import FormExtension from './FormExtension';

import CustomButton from '../components/CustomButton';

import dictionary from './dictionaryExtension.json';

const ProfileScreenExtension = props => {

    const [profile, setProfile] = useState(null);
    const [edit, setEdit] = useState(false);
    const [edited, setEdited] = useState(false);
    const [form, setForm] = useState(null);

    useEffect(() => {
        (async () => {
            
            const res = await fetch(`${config.serverURL}/api/profile/`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email:  props.navigation.state.params.email
                })
            });
    
            if (res.status == 200) {
                setProfile(await res.json());
            }
            else if (res.status === 403) {
                Alert.alert('ERROR', 'Login Timeout.');
                props.navigation.state.params.logout();
                props.navigation.navigate({routeName: 'Main'});
            }
            else
                Alert.alert('ERROR', 'Unexpected error. Contact system admin.');

        })();        
    }, [edited]);

    const editProfile = async () => {
        const res = await fetch(`${config.serverURL}/api/profile/requestEdit`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:  props.navigation.state.params.email,
                language: props.navigation.state.params.language
            })
        });

        if (res.status == 200) {
            setForm(await res.json());
            setEdit(true);
        }
        else if (res.status === 403) {
            Alert.alert('ERROR', 'Login Timeout.');
            props.navigation.state.params.logout();
            props.navigation.navigate({routeName: 'Main'});
        }
        else
            Alert.alert('ERROR', 'Unexpected error. Contact system admin.');

    };

    const onSubmit = async (data) => {
        const res = await fetch(`${config.serverURL}/api/profile/edit`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                email:  props.navigation.state.params.email,
                details: data
            })
        });
        
        if (res.status == 200) {
            setEdit(false);
            setEdited(!edited);
        }
        else if (res.status === 403) {
            Alert.alert('ERROR', 'Login Timeout.');
            props.navigation.state.params.logout();
            props.navigation.navigate({routeName: 'Main'});
        }
        else
            Alert.alert('ERROR', 'Unexpected error. Contact system admin.');
    };

    let content = <View style={styles.fallbackTextContainer}><Text style={styles.text}>{dictionary[props.navigation.state.params.language].PROFILE_LOADING}</Text></View>
    if (profile !== null) {
        if (!edit) {
            content = (
                <View style={styles.container}>
                    <View style={styles.textContainer}>
                        <View style={styles.userContainer}>
                            <Text style={styles.nameText}>{profile.name} ({profile.type})</Text>
                            <Text style={styles.emailText}>{profile.email}</Text>
                        </View>

                        <View style={styles.rowContainer}>
                            <Text style={styles.detailText}>{dictionary[props.navigation.state.params.language].PROFILE_BIRTH}: </Text>
                            <Text style={styles.text}>{profile.birth}</Text>
                        </View>
                        
                        <View style={styles.rowContainer}>
                            <Text style={styles.detailText}>{dictionary[props.navigation.state.params.language].PROFILE_ZIP}: </Text>    
                            <Text style={styles.text}>{profile.zip}</Text>
                        </View>
                        
                        <View style={styles.rowContainer}>
                            <Text style={styles.detailText}>{dictionary[props.navigation.state.params.language].PROFILE_GENDER}: </Text>
                            <Text style={styles.text}>{profile.gender}</Text>
                        </View>

                        <View style={styles.rowContainer}>
                            <Text style={styles.detailText}>{dictionary[props.navigation.state.params.language].PROFILE_EDUCATION}: </Text>
                            <Text style={styles.text}>{profile.education}</Text>
                        </View>

                        <View style={styles.rowContainer}>    
                            <Text style={styles.detailText}>{dictionary[props.navigation.state.params.language].PROFILE_INCOME}: </Text>
                            <Text style={styles.text}>{profile.income}</Text>
                        </View>

                        <View>    
                            <Text style={styles.detailText}>{dictionary[props.navigation.state.params.language].PROFILE_FREQUENCY}: </Text>
                            <Text style={styles.text}>{profile.frequency}</Text>
                        </View>

                        <View>    
                            <Text style={styles.detailText}>{dictionary[props.navigation.state.params.language].PROFILE_TIMEOFDAY}: </Text>
                            <Text style={styles.text}>{profile.timeofday}</Text>
                        </View>

                        <View>    
                            <Text style={styles.detailText}>{dictionary[props.navigation.state.params.language].PROFILE_TIMEOFWEEK}: </Text>
                            <Text style={styles.text}>{profile.timeofweek}</Text>
                        </View>

                        <View>    
                            <Text style={styles.detailText}>{dictionary[props.navigation.state.params.language].PROFILE_TRANSPORTATION}: </Text>
                            <Text style={styles.text}>{profile.transportation}</Text>
                        </View>
                    </View>

                    <CustomButton
                        title='Edit'
                        onPress={editProfile}
                        backgroundColor={Colors.primary}
                        textColor={Colors.secondary}
                    />
                </View>
            );
        }
        else {
            content = (
                <View>
                    <ScrollView style={styles.formContainer}>
                        <Form json={form} extension={FormExtension} onSubmit={onSubmit} showSubmitButton={false} />
                    </ScrollView>
                </View>
            );
        }
    }

    return (
        <View style={styles.container}>
            {content}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,        
        width: '100%',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Dimensions.get('window').height*0.01,
        paddingBottom: Dimensions.get('window').height*0.05,
        paddingHorizontal: Dimensions.get('window').width * 0.02
    },
    textContainer: {
        width: '100%'
    },
    formContainer: {
        width: '100%'
    },
    rowContainer: {
        flexDirection: 'row',
        alignItems: 'center', 
        justifyContent: "space-between"
    },
    userContainer: {
        marginBottom: Dimensions.get('window').height*0.03
    },
    text: {
        fontSize: Dimensions.get('window').width*0.05
    },
    nameText: {
        fontSize: Dimensions.get('window').width*0.09,
        fontWeight: "bold"
    },
    emailText: {
        fontSize: Dimensions.get('window').width*0.05,
        fontWeight: "bold"
    },
    detailText: {
        fontSize: Dimensions.get('window').width*0.05,
        fontWeight: "bold"
    },
    fallbackTextContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ProfileScreenExtension;