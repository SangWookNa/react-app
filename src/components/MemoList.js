import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = {
    card: {
        minWidth: 275,
    },
    title: {
        fontSize: 20,
    },
    pos: {
        marginBottom: 5,
    },
};

class MemoList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        const { classes } = this.props;

        return (
            <Grid container spacing={8}>
                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} >
                                나상욱
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                adjective
                            </Typography>
                            <Typography component="p">
                                well meaning and kindly.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">
                                EDIT
                            </Button>
                            <Button size="small" color="primary">
                                DELETE
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
                <Grid item xs={12}>
                    <Card className={classes.card}>
                        <CardContent>
                            <Typography className={classes.title} >
                                나상욱
                            </Typography>
                            <Typography className={classes.pos} color="textSecondary">
                                adjective
                            </Typography>
                            <Typography component="p">
                                well meaning and kindly.
                                well meaning and kindly.
                                well meaning and kindly.
                                well meaning and kindly.
                                well meaning and kindly.
                                well meaning and kindly.
                                well meaning and kindly.
                            </Typography>
                        </CardContent>
                        <CardActions>
                            <Button size="small" color="primary">
                                EDIT
                            </Button>
                            <Button size="small" color="primary">
                                DELETE
                            </Button>
                        </CardActions>
                    </Card>
                </Grid>
            </Grid>

        );
    }
}

MemoList.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MemoList);