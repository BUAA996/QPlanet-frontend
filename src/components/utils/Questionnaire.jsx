import { Button, Card, Divider, Grid, Link } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { Link as RouterLink, useHistory } from "react-router-dom";
import { deleteQuestionnaire, recover } from 'api/questionaire'

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
	},
	description: {
		fontSize: 14,
		paddingLeft: theme.spacing(3),
		color: theme.palette.primary.light,
	}
}));

const Questionaire_STATUS = [
	"未发布",
	"已发布",
	"已完成",
	"已删除",
];

function Questionare(props) {
	const classes = useStyles();
	const history = useHistory();

	function handleDelete(data) {
		deleteQuestionnaire(data);
		history.go(0);
	}	

	function handleRecover() {
		recover({'id': props.id});
		history.go(0);
	}

	return (
		(props.showType === -1 || props.showType === 5 || props.showType === props.status) ? 
		<Card className={classes.root}>
			<Grid container>
				<Grid item xs={7}>
					<Link component={RouterLink} to={"/fill/" + props.hash} className={classes.title}>
						{props.title}
					</Link>
				</Grid>
				<Grid item xs={5} className={classes.info}>
					ID:&nbsp;{props.id}&nbsp;
					<span style={{color: 'red'}}>{Questionaire_STATUS[props.status]} &nbsp;</span>

					{props.status === 1 ? <>发布时间: {props.uploadTime}</> : <>创建时间: {props.createTime} </>}
					
					填写人数:&nbsp;{props.count}&nbsp;
				</Grid>
			</Grid>
			<Divider variant="middle"/>
			<Grid container className={classes.sub}>
				<Grid item xs={12} className={classes.description}>
					{props.description}
				</Grid>
				<Grid item xs={7}>
					<Button component={RouterLink} to={"/design/" + props.hash} color="primary"> 设计问卷 </Button>
					<Button color="primary"> 分享问卷 </Button>
					<Button component={RouterLink} to={"/feedback/" + props.hash} color="primary"> 分析/下载 </Button>
				</Grid>
				<Grid item xs={5}>
					{props.status == 0 ? <Button color="primary"> 发布 </Button> : null}
					{props.status == 1 ? <Button color="primary"> 停止 </Button> : null}
					<Button color="primary"> 复制 </Button>
					<Button color="primary" onClick={() => handleDelete({"id": props.id})}> {props.status === 3 ? '彻底删除' : '删除'} </Button>
					{props.status == 3 ? <Button color="primary" onClick={() => handleRecover()}> 恢复 </Button> : null}
				</Grid>
			</Grid>
		</Card> : null
	);
}

export default Questionare;