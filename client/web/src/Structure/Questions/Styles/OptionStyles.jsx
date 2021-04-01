import { makeStyles } from "@material-ui/core/styles";

export const OptionStyles = makeStyles((theme) => ({
    main : {
        width: '100%',
        height: '100%',
        borderRadius: '2px',
        border: '1px solid rgb(159,159,159,1)',
        boxShadow: '0px 0px 1px 1px rgb(0,0,0,0.25)',
        display: 'flex',
        alignItems:'center',
        flexWrap: 'wrap',
        margin: 0,
        whiteSpace: "unset",
        wordBreak: "break-all"
    },
    label : {
        width: '100%',
        height: '100%',
    },
    radio : {
        color: 'rgb(159,159,159,1)',
    },
}));