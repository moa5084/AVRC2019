const Styles = (theme) => ({
    AnswerSheet: {
        width: '100%',
        margin: '0',
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.5)',
        boxShadow: '3px 3px 1px 1px rgba(40, 40, 40, 0.2), inset 0 0 10px 0 #fff',
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
    },
    Header: {
        width: '100%',
        textAlign: 'center',
    },
    QuestionWrapper: {
        width: '90%',
        minHeight: '60px',
        position: 'relative',
        padding: '10px',
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
        },
    },
    img: {
        width: '100%',
        height: 'auto'
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
});

export default Styles;