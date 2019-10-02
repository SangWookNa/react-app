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
import {SimpleDialog} from '../common';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

const styles = {
    root: {
        flexGrow: 1,
    },
    card: {
        minWidth: 275,
    },
    title: {
        fontSize: 20,
    },
    subheader: {
        fontSize: 13,
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
        //anchorEl: '',                     //드롭메뉴 활성화
        selectedValue: '',                  //메모수정, 삭제 구분 값
        contents: this.props.data.contents, //메모내용
        open: false,                        //다이얼로그 팝업 오픈여부
        editMode: false                     // 수정폼 오픈여부
    };

    handleClick = event => {
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

    handleClickDialogOpen = (e) => {

        let handleGubn = e.target.id;
        let loginId = this.props.status.info.userid;
        let enterId = this.props.data.enterid;

        //세션의 userid와 청첩장 enterid가 같으면 방명록 삭제가 가능함
        if(handleGubn === 'delete' && (loginId === enterId)){
            if(window.confirm('이 메세지를 삭제하시겠어요?')){
                this.handleRemove();
            }
        }
        
        //그외에는 비밀번호 체크 다이얼로그 팝업 노출
        this.setState({
            open: true,
            selectedValue: e.target.id,
            anchorEl: null
        });
    };

    handleDialogClose = () => {
        this.setState({ open: false });
    };

    handleCheck = (password, _id, selectedValue) => {

        this.props.onCheck(password, _id, selectedValue)
            .then((result) => {
                if (result === 'SUCCESS') {
                    this.setState({
                        editMode: !this.state.editMode,
                        open: false
                    })
                }
            });
    };

    handleEditMode = () => {

        this.setState({
            editMode: !this.state.editMode,        
            contents: this.props.data.contents
        });
    };

    handleEdit = () => {
        let _id = this.props.data._id;
        let contents = this.state.contents;

        this.props.onEdit(_id, contents).then((result) => {            
            if(result === 'SUCCESS'){
                this.setState({
                    editMode : false
                })
            }
        });
    }

    handleChange = (e) => {

        this.setState({
            contents: e.target.value
        });
    }

    render() {
        console.log('memo render');
        const { classes } = this.props;
        const { anchorEl } = this.state;
        const formatter = buildFormatter(koreaStrings)

        const memoView = (
            <div className={classes.root}>
                <Card className={classes.card} elevation={3}>
                    <CardHeader className={classes.header} classes={{ title :classes.title , subheader: classes.subheader}}
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
                        {this.state.contents}
                    </Typography>
                    </CardContent>
                </Card>
                <Menu
                    id="simple-menu"
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={this.handleClose}
                >
                    <MenuItem id="edit" onClick={this.handleClickDialogOpen}>Edit</MenuItem>
                    <MenuItem id="delete" onClick={this.handleClickDialogOpen}>Delete</MenuItem>
                </Menu>
                <SimpleDialogWrapped
                    selectedValue={this.state.selectedValue}
                    open={this.state.open}
                    onCheck={this.handleCheck}
                    onClose={this.handleDialogClose}
                    writer={this.props.data.writer}
                    _id={this.props.data._id}
                />
            </div>
        );

        const editView = (
            <div className={classes.root}>
                <Card className={classes.card}>
                <CardHeader className={classes.header} classes={{ title :classes.title , subheader: classes.subheader}}
                        action={
                            <div>
                                <Button onClick={this.handleEdit} color="primary">
                                    수정
                                </Button>
                                <Button onClick={this.handleEditMode} color="primary">
                                    취소
                                </Button>
                            </div>
                        }
                        title={this.props.data.writer}
                        component="h6"
                        subheader={<TimeAgo date={this.props.data.date.created} formatter={formatter} />}
                    />
                    <CardContent>
                        <TextField
                            id="outlined-multiline-flexible"
                            className={classes.pos}
                            multiline
                            fullWidth
                            autoFocus={true}
                            value={this.state.contents}
                            onChange={this.handleChange}
                            margin="normal"
                            variant="outlined"
                        />
                    </CardContent>
                </Card>
            </div>
        );
        return (
            <Grid item xs={12}>
                {this.state.editMode ? editView : memoView}
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
    onCheck: (password, _id, selectedValue) => {
        console.error('onCheck function not defined');
    },
    onEdit: (_id, contents) => {
        console.error('onEdit function not defined');
    },

}

const mapStateToProps = (state) => {
    return {
      status: state.kakao.status,
    };
  };
  
export default connect(mapStateToProps)(withStyles(styles)(Memo));