import React, {useEffect, useState} from 'react';
import { 
    View, 
    Text, 
    TextInput, 
    Keyboard, 
    TouchableOpacity, 
    ImageBackground,
    Image,
    KeyboardAvoidingView, 
    Dimensions,
    Alert,
    StatusBar,
    StyleSheet,
    TouchableWithoutFeedback} from 'react-native';

import config from '../extension/config';
import * as ImagePicker from 'expo-image-picker';
import CustomButton from '../components/CustomButton';
import * as Permissions from 'expo-permissions';
import globalStyles from '../constants/globalStyles';
import RankingHandler from '../extension/RankingHandler'
import { MaterialIcons } from '@expo/vector-icons'; 
import dictionary from '../data/dictionary.json';
import Colors  from '../constants/colors';

// Window width and height used for styling purposes
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const ProfileScreenExtension = props => {

    /************************************************
     * STATES
     ************************************************/
    const [ranking, setRanking] = useState(0);
    const [camera_RollPermission, setCamera_RollPermission] = useState(false);
    const [name, setName] = useState('');
    const [base64, setBase64] = useState('');
    const [email, setEmail] = useState('');
    const [type, setType] = useState('');
    const [edit, setEdit] = useState(false);

    useEffect(() => {
        (async () => {

            const permissions = await Permissions.askAsync(Permissions.CAMERA_ROLL);
            setCamera_RollPermission(permissions.permissions.cameraRoll.status);

            const res = await fetch(`${config.serverURL}/api/users/get`,{
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ email: props.navigation.state.params.email
                })
            })
            if (res.status == 200){
                await res.json()
                .then( response =>{
                    if(response[0].name) setName(response[0].name)
                    if(response[0].ranking) setRanking(response[0].ranking)
                    if(response[0].base64) setBase64(response[0].base64)
                    if(response[0].email) setEmail(response[0].email)
                    if(response[0].type) setType(response[0].type)
                })
            }
        })();
    }, []);

    /************************************************
     * FUNCTIONS
    ************************************************/
    const _pickImage = async () => {
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
            base64: true,
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 0.05,
            });
            if (!result.cancelled) {
            setBase64(result.base64)

            }
        } catch (E) {
            Alert.alert(dictionary[props.navigation.state.params.language].ERROR)
        }
    };

    const nameInputHandler = (enteredName) => {
        setName(enteredName);
    };

    // Registers user with the server
    const update = async () => {
        const data = new FormData();
        data.append('email', props.navigation.state.params.email); 
        data.append('name', name); 
        data.append('base64', base64);
        const res = await fetch(`${config.serverURL}/api/users/edit`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
            },
            body: data
        });
        setEdit(false);
    };

    /************************************************
     * PRE-RENDER
    ************************************************/
    let content = (
        <View style={styles.infoContainer}>
            <Text style={styles.infoText}>{name} ({type})</Text>
            <Text style={styles.infoText}>{email}</Text>
            <View style={styles.editIconContainer}>
                <TouchableOpacity onPress={() => setEdit(true)}>
                    <MaterialIcons name="border-color" size={24} color={Colors.primary} />
                </TouchableOpacity>
            </View>
        </View>
    );

   if (edit)
        content = (
            <View style={styles.editContainer}>
                <View style={styles.uploadPhotoContainer}>
                    <Text style={styles.uploadPhoto} onPress={_pickImage}>{dictionary[props.navigation.state.params.language].UPDATE_PHOTO}</Text>
                </View>
                <View style={{paddingHorizontal: windowWidth*0.05}}>
                    <Text style={styles.editFieldTitle}>{dictionary[props.navigation.state.params.language].NAME}</Text>
                    <TextInput
                        style={styles.textinput}
                        placeholder={name}
                        placeholderTextColor={Colors.secondary}
                        value={name}
                        onChangeText={nameInputHandler}
                    />
                </View>
                <View style={styles.saveButtonContainer}>
                    <CustomButton
                        title={'Save'}
                        onPress={update}
                        backgroundColor={Colors.primary}
                        textColor={'white'}
                        width={windowWidth*0.75}
                        height={windowHeight*0.045}
                        borderRadius={10}
                    />
                </View>
            </View>
        );

    let photo = (
        <TouchableOpacity onPress={_pickImage} style={styles.touchable}>
            <MaterialIcons name="add-a-photo" size={40} color={Colors.primary}/>
        </TouchableOpacity> )

    if (base64) photo = (
        <Image
            source={{ uri: `data:image/png;base64,${base64}`}}
            style={styles.profilePicture}
        />
    )

    return (
        <KeyboardAvoidingView 
            behavior={Platform.OS == "ios" ? "padding" : "default"} 
            style={globalStyles.screen}
        >      
            <StatusBar barStyle={Platform.OS == "ios" ? "dark-content" : "default"}/>
            <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>

                <View style={styles.container}>

                    <RankingHandler ranking={ranking} language={props.navigation.state.params.language}/>

                    <View style={{width: '100%', alignItems: 'center', marginTop: -windowHeight*0.15}}>
                        {photo}
                        {content}
                    </View>
                    
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
    );
};


const styles = StyleSheet.create({
    container: {
        ...globalStyles.shadow, 
        backgroundColor:'white',
        borderRadius: (windowWidth + windowHeight) * 0.01, 
        width: '85%',
        alignItems:'center',
        marginVertical: windowHeight*0.02,
        overflow: 'hidden',
    },
    textinput: {
        textAlignVertical: 'center',
        fontSize: 16,
        paddingVertical: windowHeight * 0.01,
        paddingHorizontal: windowWidth * 0.02,
        marginVertical: windowHeight * 0.02,
        backgroundColor: 'white',
        borderWidth: 1,
        borderColor: 'white',
        borderRadius: (windowHeight+windowWidth) * 0.01,
        ...globalStyles.shadow,
        fontSize: (windowWidth + windowHeight) * 0.015
    },
    uploadPhoto: {
        color: Colors.primary, 
        textDecorationLine: 'underline',
        fontSize: (windowWidth + windowHeight) * 0.012,
    },
    touchable: {
        borderRadius: windowWidth*0.45/2, 
        width: windowWidth*0.45, 
        height: windowWidth*0.45, 
        alignItems:'center', 
        justifyContent:'center'
    },
    infoText: {
        color: Colors.primary,
        fontSize: (windowWidth + windowHeight)*0.015,
        marginVertical: windowHeight*0.01
    },
    profilePicture: {
        width: windowWidth*0.4,
        height: windowWidth*0.4,
        borderRadius: (windowWidth + windowHeight),
        marginVertical: windowHeight*0.05
    },
    editIconContainer: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        alignItems: 'center',
        width:'100%',
        marginBottom: windowHeight*0.02,
        paddingHorizontal: windowWidth*0.05
    },
    saveButtonContainer: {
        width: '100%',
        marginVertical:windowHeight*0.02,
        alignItems: 'center'
    },
    infoContainer: {
        width: '100%',
        alignItems: 'center'
    },
    editFieldTitle: {
        color: Colors.primary,
        fontSize: (windowWidth + windowHeight)*0.015,
    },
    editContainer: {
        width: '100%'
    },
    uploadPhotoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: -windowHeight*0.04,
        marginBottom: windowHeight*0.04
    }
});

export default ProfileScreenExtension; 