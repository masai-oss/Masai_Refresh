import { makeStyles, createStyles } from "@material-ui/core/styles";

const QuestionsStyles = makeStyles((theme) => createStyles({
    root: {

    },
    top: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    save: {
        backgroundColor: '#2196f3',
        color: 'white'
    },
    delete: {
        backgroundColor: '#ff6b81',
        color: 'white'
    },
    id: {
        textDecoration: 'underline',
        cursor: 'pointer',
        color: '#2196f3'
    },
    modal: {
        display: 'flex',
        padding: theme.spacing(1),
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        width:"100%",
        height: "100%",
        backgroundColor: 'white',
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
        overflowY: 'auto',
        position: 'relative'
    },
    evenSpace: {
        display: 'flex',
        justifyContent: 'space-evenly',
        alignItems:'center'
    }
}));

export { QuestionsStyles }

