import { StyleSheet, Dimensions, Platform } from 'react-native';

const colors = {
    blue: '#42aaf5',
    red: '#e33232',
    white: '#ffffff',
    mustard: '#FFDB58',
    //titles, text
    spinach: 'white',
    //background, highlights, secondary
    hollendaise: '#1e0e75',
    //main background, primary
    lime: '#53d681',
};

export const headerStyles = {
    headerStyle: {
        backgroundColor: '#272b28',
        elevation: 0,
        shadowOpacity: 0,
        borderBottomWidth: 0,
    },
    hedaerTitleStyle:{
        color: 'white',
    }
};

export const appStyles = StyleSheet.create({
    text: {
        color: 'white',
        fontSize: 24,
    },
    wideButton: {
        backgroundColor: colors.lime,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 20,
        marginBottom: 20,
    },
    listTitle: {
        borderBottomColor: colors.lime,
        borderBottomWidth: 2,
        marginBottom: 10,
        alignContent: 'stretch',
    },
    safe: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'stretch',
        justifyContent: 'center',
        height: Dimensions.get('window').height,
        width: Dimensions.get('window').width,
        backgroundColor: "#272b28",
    },
    padding: {
        padding: 20
    },
    main: {
        //flex: 1,
        padding: 20,
        justifyContent: 'center',
        alignItems: 'center',
        alignContent: 'center',

        backgroundColor: "#272b28",
    },
    themedSafe: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'stretch',
        justifyContent: 'center',
        backgroundColor: "#272b28",

    }
});

//authentication
export const authStyles = StyleSheet.create({
    ...appStyles,
    textInput: {
        fontWeight: '100',
        fontSize: 16,
        fontFamily: 'BloggerSans-Medium',
        color: 'white',
    },
    //To-Duo
    logoView: {
        display: 'flex',
        flexDirection: 'row',
    },
    titleTo: {
        fontSize: 60,
        textAlign: 'center',
        fontFamily: 'BloggerSans-BoldItalic',
        color: colors.spinach,
    },
    titleDuo: {
        fontSize: 60,
        textAlign: 'center',
        fontFamily: 'BloggerSans-BoldItalic',
        color: '#002b54',
    },
    container: {
        //backgroundColor: 'white',
        padding: 7,
        marginTop: 10,
        alignItems: 'stretch',
        justifyContent: 'center',
        //borderColor: '#EBEBEB',
        borderBottomWidth: 2,
        borderBottomColor: 'white',
        marginBottom: 8,
        // shadowColor: '#000',
        // shadowOffset: {
        //     width: 0,
        //     height: 1,
        // },
        // shadowOpacity: 0.22,
        // shadowRadius: 2.22,
        // elevation: 3
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
        backgroundColor: colors.lime,
        borderRadius: 60,
        height: 40
    },
    //links----------------------
    link: {
        alignItems: 'center',
        marginTop: 10
    },
    signupLinkText: {
        color: colors.spinach,
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
        backgroundColor: colors.lime,
        borderRadius: 60,
        height: 40
    },
    loginLinkText: {
        color: colors.spinach,
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
    safe:{
        justifyContent: 'center',
        flex: 1,
        backgroundColor: '#272b28',
    },
    name: {
        fontSize: 20,
        fontWeight: 'bold',
        margin: 20,
        color: 'white',
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
        backgroundColor: colors.lime,
        alignSelf: 'stretch',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderRadius: 20,
        marginBottom: 20,
    },
    signout: {
        backgroundColor: colors.lime,
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
        backgroundColor: "#272b28",
    },
    button: {
        backgroundColor: '#ffc400',
        borderRadius: 300,
        width:250,
        height:250,
        alignItems:'center',
        justifyContent:'center',
        paddingTop: Platform.OS === 'ios'? 20:0,
    },
    plus: {
        fontSize: 300,
    }
})

export const addGoalStyles = StyleSheet.create({
    ...appStyles,
})

//goal
export const individualGoalStyles = StyleSheet.create({
    ...appStyles,
    goalText: {
        color: 'white'
    },
    main: {
        //flex: 1,
        padding: 20,
        alignItems: 'flex-start',
        alignContent: 'stretch',

        backgroundColor: "#272b28",
    },
    safe: {
        flex: 1,
        alignItems: 'stretch',
        backgroundColor: "#272b28",
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        paddingBottom: 1,
    },
    milestonesText: {
        textAlign: 'left',
        fontWeight: 'bold',
        fontSize: 20,
        color: 'white',
    },
    flatListContainer: {
        marginTop: 10
    },
    goalContainerTwo: {
        padding: 7,
        marginTop: 10,
        marginRight: .5,
        marginLeft: .5,
        marginBottom: 1,
        alignItems: 'stretch',
        borderBottomColor: 'gray',
        borderBottomWidth: 2,
    },
    toDoItem: {
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'flex-start',
        borderBottomWidth: 2,
        marginHorizontal: 5,
        borderBottomColor: '#aaa',
    },
});

//TODO
export const devFlatListStyles = StyleSheet.create({
    ListItem: {
        backgroundColor: colors.lime,
        height: 50,
        marginVertical: 5,
        borderRadius: 8,
        alignSelf: 'stretch',
        width: 300,
        alignItems: 'center',
        justifyContent: 'center',
    },
    ListItemText: {
        color: colors.white,
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
      paddingHorizontal: 10,
      color: 'white'
    },
});

// input button
export const buttonStyles = StyleSheet.create({
    container: {
      marginHorizontal: 20,
      paddingVertical: 10,
      paddingHorizontal: 16,
      backgroundColor: '#53d681',
      borderRadius: 3
    },
    text: {
      color: '#FFF'
    },
    
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
      backgroundColor: '#53d681',
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

  export const settingsScreenStyles = StyleSheet.create({
      mainContainer: {
        flex: 1,
        alignContent: 'center',
        alignItems: 'stretch',
       // justifyContent: 'center',
        marginTop:10,
        backgroundColor: 'white',
      },
      padding: {
        padding: 20
    },
    main: {
        padding: 20,
        //justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        backgroundColor: 'white',
        padding: 7,
        marginTop: 10,
        alignItems: 'stretch',
       // justifyContent: 'center',
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
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#42aaf5',
        borderRadius: 60,
        height: 40
    },
    title: {
        marginTop:10,
        fontSize: 20,
        textAlign: 'center',
        fontFamily: 'BloggerSans-BoldItalic'
    },
    goBack: {
        marginTop:10
    },
    resetPassword:{
        marginTop:10
    }
  })

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
    