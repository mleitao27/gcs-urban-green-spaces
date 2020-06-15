import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, Alert, StyleSheet, Dimensions } from 'react-native';

import config from './config';

import {Form} from 'react-native-json-forms';
import FormExtension from './FormExtension';

import CustomButton from '../components/CustomButton';

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
                email:  props.navigation.state.params.email
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

    let content = <View style={styles.fallbackTextContainer}><Text style={styles.text}>Loading Profile...</Text></View>
    if (profile !== null) {
        if (!edit) {
            content = (
                <View style={styles.container}>
                    <View>
                        <View style={styles.userContainer}>
                            <Text style={styles.nameText}>{profile.name} ({profile.type})</Text>
                            <Text style={styles.emailText}>{profile.email}</Text>
                        </View>

                        <View style={styles.rowContainer}>
                            <Text style={styles.detailText}>Date of Birth: </Text>
                            <Text style={styles.text}>{profile.birth}</Text>
                        </View>
                        
                        <View style={styles.rowContainer}>
                            <Text style={styles.detailText}>Zip Code: </Text>    
                            <Text style={styles.text}>{profile.zip}</Text>
                        </View>
                        
                        <View style={styles.rowContainer}>
                            <Text style={styles.detailText}>Gender: </Text>
                            <Text style={styles.text}>{profile.gender}</Text>
                        </View>

                        <View style={styles.rowContainer}>
                            <Text style={styles.detailText}>Education: </Text>
                            <Text style={styles.text}>{profile.education}</Text>
                        </View>

                        <View style={styles.rowContainer}>    
                            <Text style={styles.detailText}>Income: </Text>
                            <Text style={styles.text}>{profile.income}</Text>
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
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: Dimensions.get('window').height*0.01,
        paddingBottom: Dimensions.get('window').height*0.05,
        paddingHorizontal: Dimensions.get('window').width * 0.02
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