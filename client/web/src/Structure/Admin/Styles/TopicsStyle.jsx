import { makeStyles, createStyles } from "@material-ui/core/styles";

export const TopicsStyle = makeStyles((theme) => createStyles({

    root : {
        padding: "30px",
        border: "none",
        fontSize: 20,
        margin: "30px",
        width: "200px",
        borderRadius: 10,
        border: "0.2px solid #2C98F0",
        background: "white",
        fontFamily: "sans-serif",
        cursor: "pointer", 
        "&:hover" : {
            backgroundColor: "#DCDCDC"
        }
    },
    add: {
        padding: "10px",
        border: "none",
        fontSize: 15,
        margin: "10px",
        borderRadius: 4,
        border: "0.2px solid darkgrey",
        cursor: "pointer", 
        "&:hover" : {
            border: "0.2px solid #2C98F0",
        },
        outline: "none"
    },
    input: {
        marginLeft: 30,
        height: "40px",
        padding: 10,
        border: "none",
        outline: "none",
        border: "0.2px solid darkgrey",
        borderRadius: 4,
        marginTop: "10px"
    },
    list_TopicPage: {
        margin: 20
    },
    flex: {
        display: "flex"
    },
    button: {
        height: "40px",
        padding: "10px",
        marginLeft: "20px",
        paddingTop: "5px",
        background: "white",
        borderRadius: "3px",
        cursor: "pointer",
        marginTop: "10px",
        outline: "none"
    },
    img: {
        width: "15px",
        marginLeft: "5px",
        marginTop: "5px"
    },
    button2: {
        height: "40px",
        padding: "10px",
        marginLeft: "20px",
        paddingTop: "5px",
        background: "white",
        borderRadius: "3px", 
        marginLeft: "650px",
        cursor: "pointer",
        marginTop: "10px",
        outline: "none"
    }



}))