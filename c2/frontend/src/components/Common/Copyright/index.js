import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';

export default function Copyright() {
    return (
      <Typography variant="body2" color="textSecondary" align="center">
        {'Copyright © '}
        <Link color="inherit" href="https://material-ui.com/">
          Agendamento para Vacinação<br />(C3 de Dev Web II)<br />
        </Link>{' '}
        {new Date().getFullYear()}
        {'.'}
      </Typography>
    );
}
