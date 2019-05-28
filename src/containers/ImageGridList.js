import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: 500,
    height: 450,
  },
});

/**
 * The example data is structured as follows:
 *
 * import image from 'path/to/image.jpg';
 * [etc...]
 *
 * const tileData = [
 *   {
 *     img: image,
 *     title: 'Image',
 *     author: 'author',
 *     cols: 2,
 *   },
 *   {
 *     [etc...]
 *   },
 * ];
 */

const tileData = [
  {
    img: 'public/uploads/test/111.jpg',
    title: 'Image',
    author: 'author',
  },{
    img: 'public/uploads/test/111.jpg',
    title: 'Image',
    author: 'author',
  },{
    img: 'public/uploads/test/111.jpg',
    title: 'Image',
    author: 'author',
  },{
    img: 'public/uploads/test/111.jpg',
    title: 'Image',
    author: 'author',
  },{
    img: 'public/uploads/test/111.jpg',
    title: 'Image',
    author: 'author',
  },
];
function ImageGridList(props) {
  //const classes = this.props;

  return (
    <div className={props.root}>
      <GridList cellHeight={160} className={props.gridList} cols={3}>
        {tileData.map(tile => (
          <GridListTile key={tile.img} cols={tile.cols || 1}>
            <img src={tile.img} alt={tile.title} />
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}

export default withStyles(styles)(ImageGridList);