import { StyleSheet } from 'react-native';

export const colors = {
    blue: '#42aaf5',
    red: '#e33232',
};

export const appStyles = StyleSheet.create({
    safe: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    padding: {
        padding: 20
    },
});

export const authStyles = StyleSheet.create({
    ...appStyles,
    textInput: {
        fontWeight: '100',
        fontSize: 16,
        fontFamily: 'BloggerSans-Medium'
    },
    title: {
        fontSize: 60,
        textAlign: 'center',
        fontFamily: 'BloggerSans-BoldItalic'
    },
    container: {
        backgroundColor: 'white',
        padding: 7,
        marginTop: 10,
        alignItems: 'stretch',
        justifyContent: 'center',
        borderColor: '#EBEBEB',
        borderRadius: 10,
        marginBottom: 8,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 2.22,
        elevation: 3
    },
    //buttons--------------------
    buttonView: {
        justifyContent: 'center',
        marginTop: 15,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        letterSpacing: 2,
    },
    //links----------------------
    linkView: {
        alignItems: 'center',
        marginTop: 10
    },
});

export const loginStyles = StyleSheet.create({
    ...authStyles,
    //buttons--------------------
    logInButton: {	
        alignItems: 'center',	
        justifyContent: 'center',	
        backgroundColor: '#42aaf5',	
        borderRadius: 60,	
        height: 40	
    },
    //links----------------------
    link: {
        alignItems: 'center',
        marginTop: 10
    },
    signupLinkText: {
        color: colors.red,
        fontSize: 15,
        letterSpacing: 2,
        fontWeight: 'bold'
    }
});

export const signupStyles = StyleSheet.create({
    ...authStyles,
    signupButton: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: colors.red,
        borderRadius: 60,
        height: 40
    },
    loginLinkText: {
        color: colors.blue,
        fontWeight: 'bold',
        fontSize: 15,
        letterSpacing: 2,
    },
});