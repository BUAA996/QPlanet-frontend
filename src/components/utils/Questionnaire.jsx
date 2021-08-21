import { Button, Card, Divider, Grid, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useHistory } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
	root: {
		minWidth: 275,
		marginTop: 10,
		marginBottom: 10,
		padding: 10,
	},
	title: {
		marginLeft: 20,
	},
	info: {
		fontSize: 12,
	},
	sub: {
		marginLeft: 20,
		marginTop: 5
	}
}));

function Questionare(props) {
	const classes = useStyles();

	return (
		(props.showType === -1 || props.showType === 3 || props.showType === props.status) ? 
		<Card className={classes.root}>
			<Grid container>
				<Grid item xs={7}>
					<Link component={RouterLink} to={"/fill/" + props.hash} className={classes.title}>
						{props.title}
					</Link>
				</Grid>
				<Grid item xs={5} className={classes.info}>
					ID:&nbsp;{props.id}&nbsp;
					<span style={{color: 'red'}}>{props.status === 1 ? '已发布 ' : '未发布 '} &nbsp;</span>
					创建时间:&nbsp;{props.createTime}&nbsp;
					填写人数:&nbsp;{props.count}&nbsp;
				</Grid>
			</Grid>
			<Divider variant="middle"/>
			<Grid container className={classes.sub}>
				<Grid item xs={7}>
					<Button color="primary"> 设计问卷 </Button>
					<Button color="primary"> 分享问卷 </Button>
					<Button color="primary"> 分析/下载 </Button>
				</Grid>
				<Grid item xs={5}>
					<Button color="primary"> {props.status===0 ? '发布' : '停止'} </Button>
					<Button color="primary"> 复制 </Button>
					<Button color="primary"> 删除 </Button>
				</Grid>
			</Grid>
		</Card> : null
	);
}

export default Questionare;