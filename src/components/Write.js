import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    input1: {
        height: 15
    },
    container: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    button: {
        margin: theme.spacing.unit,
      },
    textField: {
        marginLeft: theme.spacing.unit,
        marginRight: theme.spacing.unit,

    },
    dense: {
        marginTop: 1,
    },
    font: {
        fontFamily: '"Noto Sans KR", verdana, san-serif',
    }
});

class Write extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            name: 'Cat in the Hat',
            age: '',
            multiline: 'Controlled',
            currency: 'EUR',
        };
    }

    render() {
        const { classes } = this.props;
        return (
            <div className={classes.root}>
                <Grid container spacing={8}>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-name"
                            label="name"
                            fullWidth
                            InputProps={{ classes: { input: classes.input1 } }}
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={6}>
                        <TextField
                            id="outlined-password-input"
                            label="password"
                            type="password"
                            fullWidth
                            InputProps={{ classes: { input: classes.input1 } }}
                            autoComplete="current-password"
                            margin="normal"
                            variant="outlined"
                        />
                    </Grid>
                    <Grid item xs={9}>
                        <TextField
                            id="standard-multiline-flexible"
                            label={<Typography color="inherit" className={classes.font}>축하 메세지를 남겨주세요!</Typography>}
                            rowsMax="4"
                            multiline
                            fullWidth
                            margin="dense"
                            className={classNames(classes.dense, classes.font)}
                        />
                    </Grid>
                    <Grid style={{backgroundColor : 'Yellow'}} alignItems="flex-end"  item xs={3}>
                    <Button variant="contained" size="small" color="primary" className={classes.button}>
                        등록
                    </Button>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Write.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Write);