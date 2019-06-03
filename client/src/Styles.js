const Styles = (theme) => ({
    Header: {
        width: '100%',
        height: '10%',
        position: 'fixed',
        textAlign: 'center',
        top: '0',
        left: '0',
    },
    AnswerSheet: {
        width: '100%',
        maxHeight: '90%',
        overflow: 'scroll',
        margin: '0',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.5)',
        boxShadow: '3px 3px 1px 1px rgba(40, 40, 40, 0.2), inset 0 0 10px 0 #fff',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    SheetHeader: {
        width: '100%',
        textAlign: 'center',
    },
    QuestionWrapper: {
        width: '90%',
        minHeight: '60px',
        position: 'relative',
        padding: '10px',
        display: 'flex',
        flexWrap: 'wrap',
        '&::before': {
            content: '""',
            width: '20px',
            height: '30px',
            position: 'absolute',
            display: 'inline-block',
            top: '0',
            left: '0',
            borderLeft: '#999 1px solid',
            borderTop: '#999 1px solid',
            pointerEvents: 'none',
        },
        '&::after': {
            content: '""',
            width: '20px',
            height: '30px',
            position: 'absolute',
            display: 'inline-block',
            bottom: '0',
            right: '0',
            borderRight: '#999 1px solid',
            borderBottom: '#999 1px solid',
            pointerEvents: 'none',
        },
    },
    img: {
        width: '100%',
        height: 'auto',
        alignSelf: 'center'
    },
    Form: {
        margin: '40px 0',
        width: '100%',
        display: 'flex',
    },
    answerField: {
        flexGrow: '5',
    },
    submitButton: {
        flexGrow: '1',
        margin: '0 3%',
    },
    Footer: {
        width: '100%',
        minHeight: '10px',
        textAlign: 'center',
    },
    footerImg: {
        maxWidth: '40%',
        height: 'auto',
    },
    QuestionLinkWrapper: {
        width: '20%',
        position: 'relative',
        '&::before': {
            content: '""',
            display: 'block',
            width: '100%',
            paddingTop: '100%',
        }
    },
    QuestionLinkBlock: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        position: 'absolute',
        top: '0',
        left: '0',
        right: '0',
        bottom: '0',
        boxSizing: 'border-box',
        border: '#ccc 1px solid',
        borderRadius: '3px',
        margin: '2px',
    },
    QuestionLink: {
        display: 'block',
        textDecoration: 'none',
    }
});

export default Styles;