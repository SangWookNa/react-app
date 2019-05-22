import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import IconButton from '@material-ui/core/IconButton';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TimeAgo from 'react-timeago';
import CardHeader from '@material-ui/core/CardHeader';
import koreaStrings from 'react-timeago/lib/language-strings/ko';
import buildFormatter from 'react-timeago/lib/formatters/buildFormatter';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import blue from '@material-ui/core/colors/blue';
import SimpleDialog from './SimpleDialog';



const styles = {
    root: {
        flexGrow: 1,
    },
    card: {
        minWidth: 275,
    },
    title: {
        fontSize: 18,
    },
    pos: {
        marginBottom: 5,
        fontSize: 13,
    },
    header: {
        height: 0,
        paddingTop: '5.25%', // 16:9
    },
    avatar: {
        backgroundColor: blue[100],
        color: blue[600],
    },
};

const SimpleDialogWrapped = withStyles(styles)(SimpleDialog);
class Memo extends React.Component {
    state = {
        anchorEl: null,
        open: false,
    };

    handleClick = event => {
        console.log(event.currentTarget);
        this.setState({ anchorEl: event.currentTarget });
    };

    handleRemove = () => {
        let id = this.props.data._id;
        let index = this.props.index;

        this.props.onRemove(id, index);
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleClickDialogOpen = () => {
        this.setState({
            open: true,
            anchorEl: null
        });
    };

    handleDialogClose = value => {
        this.setState({ selectedValue: value, open: false });
      };

    handleCheck = () => {
        console.log('');
        // console.log(writer);
        // console.log(password);
        // console.log(_id);

        //this.props.onCheck();
    };


    render() {
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const formatter = buildFormatter(koreaStrings)
        return (
            <Grid item xs={12}>
                <Card className={classes.card}>
                    <CardHeader className={classes.header}
                        action={
                            <IconButton aria-owns={anchorEl ? 'simple-menu' : undefined}
                                aria-haspopup="true"
                                onClick={this.handleClick}
                            >
                                <MoreVertIcon />
                            </IconButton>
                        }
                        title={this.props.data.writer}
                        component="h6"
                        subheader={<TimeAgo date={this.props.data.date.created} formatter={formatter} />}
                    />
                    <CardContent><Typography variant="body1">
                        {this.props.data.contents}
                    </Typography>
                    </CardContent>
                </Card>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem onClick={this.handleClickDialogOpen}>Edit</MenuItem>
                    <MenuItem onClick={this.handleRemove}>Delete</MenuItem>
                </Menu>
                <SimpleDialogWrapped
                    selectedValue={this.state.selectedValue}
                    open={this.state.open}
                    onClose={this.handleDialogClose}
                    onCheck={this.handleCheck}
                    writer={this.props.data.writer}
                    _id={this.props.data._id}
                />
            </Grid>

        );
    }
}

Memo.defaultProps = {
    data: {
        _id: 'id1234567890',
        writer: 'Writer',
        password: '1234',
        contents: 'Contents',
        is_edited: false,
        date: {
            edited: new Date(),
            created: new Date()
        }
    },
    ownership: true,
    index: -1,
    currentUser: '',
    onRemove: (id, index) => {
        console.error('onRemove function not defined');
    },

}

export default withStyles(styles)(Memo);