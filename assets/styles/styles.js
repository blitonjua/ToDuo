import { StyleSheet } from 'react-native';

const colors = {
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
    main: {
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
});

//authentication
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
    },
    errorText: {
        color: colors.red,
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

//profile
export const profileStyles = StyleSheet.create({
    ...appStyles,
    profilePic: {
        height: 80,
        width: 80,
        backgroundColor: 'black',
        borderRadius: 40,
        marginBottom: 20,
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20
    },
    row: {
        flexDirection: 'row',
    },
    details: {
        alignItems: 'flex-start',
        alignSelf: 'stretch',
        paddingVertical: 10,
        marginBottom: 40,
    },
    detailsTitle: {
        fontSize: 15,
        fontWeight: '700',
        marginHorizontal: 10,
        marginVertical: 6,
    },
    detailsBody: {
        fontSize: 15,
        marginHorizontal: 10,
        marginVertical: 6,
    },
    settings: {
        backgroundColor: 'gray',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 20,
        marginBottom: 20,
    },
    signout: {
        backgroundColor: 'red',
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 20,
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 15,
        letterSpacing: 2,
    },
});

//addGoal
export const plusStyles = StyleSheet.create({
    ...appStyles,
    main: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        backgroundColor: 'red',
        borderRadius: 160,

    },
    plus: {
        fontSize: 300,
    }
})

//goal
export const individualGoalStyles = StyleSheet.create({
    ...appStyles,
    safe: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: 'white',
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingBottom: 1,
    },
    milestonesText: {
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },
    flatListContainer: {
        marginTop: 10
    },
    goalContainerTwo: {
        backgroundColor: 'white',
        padding: 7,
        marginTop: 10,
        marginRight: .5,
        marginLeft: .5,
        marginBottom: 1,
        alignItems: 'stretch',
        borderColor: '#EBEBEB',
        borderRadius: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.22,
        shadowRadius: 10,
        elevation: 4
    },
    toDoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
    },
});

//TODO
export const devFlatListStyles = StyleSheet.create({
    ListItem: {
        backgroundColor: 'gray',
        borderWidth: 1,
        height: 50,
        marginVertical: 5,
        borderRadius: 8,
        alignSelf: 'stretch',
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ListItemText: {
        color: 'white',
        fontSize: 30,
    }
});

//chat input
export const inputStyles =  StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-around',
      width: '100%'
    },
    inputContainer: {
      width: '70%'
    },
    input: {
      height: 40,
      borderColor: '#B4B4B4',
      borderWidth: 1,
      borderRadius: 3,
      flexDirection: 'row',
      paddingHorizontal: 10
    }
});

// input button
export const buttonStyles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      paddingVertical: 10,
      paddingHorizontal: 16,
      backgroundColor: '#5FB0FF',
      borderRadius: 3
    },
    text: {
      color: '#FFF'
    }
});

// input loader
export const loaderStyles = StyleSheet.create({
    container: {
      position: 'absolute',
  
      top: 0,
      left: 0,
  
      height: '100%',
      width: '100%',
  
      justifyContent: 'center',
      alignItems: 'center'
    }
});

//chat message
export const messageStyles = StyleSheet.create({
    container: {
      width: '100%',
      paddingVertical: 3,
      paddingHorizontal: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    textContainer: {
      width: 160,
      backgroundColor: '#B4B4B4',
  
      borderRadius: 40,
      paddingHorizontal: 15,
      paddingVertical: 12,
      marginLeft: 10
    },
    rightContainer: {
      justifyContent: 'flex-end'
    },
    rightTextContainer: {
      backgroundColor: '#5FB0FF',
      marginRight: 10
    },
    leftText: {
      textAlign: 'left'
    },
    rightText: {
      textAlign: 'right'
    },
    text: {
      fontSize: 12
    }
  })
  
  export const flattenedStyles = {
    container: StyleSheet.flatten([messageStyles.container, messageStyles.rightContainer]),
    textContainer: StyleSheet.flatten([messageStyles.textContainer, messageStyles.rightTextContainer]),
    leftText: StyleSheet.flatten([messageStyles.leftText, messageStyles.text]),
    rightText: StyleSheet.flatten([messageStyles.rightText, messageStyles.text])
  }

//chat
export const chatStyles = StyleSheet.create({
    messagesContainer: {
      height: '100%',
      paddingBottom: 100
    },
    inputContainer: {
      width: '100%',
      height: 100,
      position: 'absolute',
      bottom: 0,
      paddingVertical: 10,
      paddingLeft: 20,
  
      borderTopWidth: 1,
      borderTopColor: '#B4B4B4'
    }
  });
    