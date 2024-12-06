import { mackStyles } from '@material-ui/icons/styles'

export default mackStyles((theme) => ({
    toolbar: theme.mixins.toolbar,
    title: {
        marginTop: '5%',
    },
    emptyButton: {
        minWidth: '150px',
        [theme.breakpoints.down('xs')]: {
            marginBottom: '5px',
        },
        [theme.breakpoints.up('xs')] : {
            marginRight: '20px',
        },
    },
    CheckoutButton: {
        minWidth: '150',
    },
    link: {
        TextDecoration: 'none',
    },
    cardDetails: {
        display: 'flex',
        marginTop: '10%',
        width: '100%',
        justifyContent: 'space-between',
    },
}));