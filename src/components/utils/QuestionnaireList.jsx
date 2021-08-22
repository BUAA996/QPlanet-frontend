import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button, Container, Grid, List, ListItem, ListItemText, Menu, MenuItem } from '@material-ui/core';
import Questionare from './Questionnaire';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography component="span">{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    minHeight: '70vh',
  },
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
  },
	sortButton: {
		marginLeft: theme.spacing(3),
	},
	test: {
		// backgroundColor: theme.palette.secondary.dark,
	}
}));

const ITEM_HEIGHT = 48;
const options = [
	{title: '默认顺序', id: 0, key: 0},
	{title: '时间升序', id: 1, key: 1},
	{title: '时间降序', id: 2, key: 2},
	{title: '问卷数量升序', id: 3, key: 3},
	{title: '问卷数量降序', id: 4, key: 4},
	{title: '发布时间升序', id: 5, key: 5},
	{title: '发布时间降序', id: 6, key: 6},
];

function SortButtons(props) {
	const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
	const handleClose = (event, index) => {
		setAnchorEl(null);
		if (index >= 0 && index <= options.length)
			props.handle(index);
	}

	return (
		<Container fixed className={classes.test}>		
			<Grid
				container
				direction="row"
				justifyContent="center"
				alignItems="center"
			>
				<Grid item xs={3}>
					<Typography variant="h5">{props.title}</Typography> 
				</Grid>
				<Grid item container xs={9}
					direction="row"
					justifyContent="flex-end"
					alignItems="center"
				>
					<Grid item xs={6}>
						<Button varient="contained" onClick={handleClick}>{options[props.index].title}</Button>
						<Menu
							id="long-menu"
							anchorEl={anchorEl}
							keepMounted
							open={open}
							onClose={handleClose}
							PaperProps={{
								style: {
									maxHeight: ITEM_HEIGHT * 5.5,
									width: '20ch',
								}
							}}
						>
							{options.map((option) => 
								option.id ? 
								<MenuItem key={option.id} selected={props.index == option.id} onClick={(event) => handleClose(event, option.id)} >
									{option.title}
								</MenuItem> : null
							)}
						</Menu>
					</Grid>
					
				</Grid>
			</Grid>
		</Container>

		// <>
		// 	<Button 
		// 		variant="contained" 
		// 		className={classes.sortButton}
		// 		onClick={() => props.setQuestionaires([].concat(props.Questionares).sort((a, b) => a.id - b.id))}
		// 	>
		// 		id升序
		// 	</Button>
		// 	<Button 
		// 		variant="contained" 
		// 		className={classes.sortButton}
		// 		onClick={() => props.setQuestionaires([].concat(props.Questionares).sort((a, b) => b.id - a.id))}
		// 	>
		// 		id降序
		// 	</Button>
		// 	<Button 
		// 		variant="contained" 
		// 		className={classes.sortButton}
		// 		onClick={() => props.setQuestionaires([].concat(props.Questionares).sort((a, b) => a.createNum - b.createNum))}
		// 	>
		// 		创建时间升序
		// 	</Button>
		// 	<Button 
		// 		variant="contained" 
		// 		className={classes.sortButton}
		// 		onClick={() => props.setQuestionaires([].concat(props.Questionares).sort((a, b) => b.createNum - a.createNum))}
		// 	>
		// 		创建时间降序
		// 	</Button>
		// 	<Button 
		// 		variant="contained" 
		// 		className={classes.sortButton}
		// 		onClick={() => props.setQuestionaires([].concat(props.Questionares).sort((a, b) => a.createNum - b.createNum))}
		// 	>
		// 		发布时间升序
		// 	</Button>
		// 	<Button 
		// 		variant="contained" 
		// 		className={classes.sortButton}
		// 		onClick={() => props.setQuestionaires([].concat(props.Questionares).sort((a, b) => b.createNum - a.createNum))}
		// 	>
		// 		发布时间降序
		// 	</Button>
		// </>
	);
}

export default function QuestionnaireList(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0); // 控制左侧的 tab 选项
	const [sortIndex, setSortIndex] = React.useState(0);
	const [childPropsList, setQuestionaires] = React.useState([]);

	useEffect(() => {
		setQuestionaires([].concat(props.Questionares));
		setSortIndex(0);
	}, [props.Questionares])
	

  const handleChange = (event, newValue) => {
    setValue(newValue);
		setSortIndex(0);
  };

	const handleSortIndexChange = (newValue) => {
		setSortIndex(newValue);
		switch (newValue) {
			case 1:
				setQuestionaires([].concat(props.Questionares).sort((a, b) => a.createNum - b.createNum));
				break;
			case 2:
				setQuestionaires([].concat(props.Questionares).sort((a, b) => b.createNum - a.createNum));
				break;
			case 3:
				setQuestionaires([].concat(props.Questionares).sort((a, b) => a.count - b.count));
				break;
			case 4:
				setQuestionaires([].concat(props.Questionares).sort((a, b) => b.count - a.count));
				break;
			case 5:
				setQuestionaires([].concat(props.Questionares).sort((a, b) => a.uploadNum - b.uploadNum));
				break;
			case 6:
				setQuestionaires([].concat(props.Questionares).sort((a, b) => b.uploadNum - a.uploadNum));
				break;
		
			default:
				break;
		}
	};

  return (
    <Grid container className={classes.root}>
			<Grid item xs={2}>
				<Tabs
					orientation="vertical"
					variant="scrollable"
					value={value}
					onChange={handleChange}
					aria-label="Vertical tabs example"
					className={classes.tabs}
				>
					<Tab label="全部问卷" {...a11yProps(0)} />
					<Tab label="未发布问卷" {...a11yProps(1)} />
					<Tab label="已发布问卷" {...a11yProps(2)} />
					<Tab label="已完成问卷" {...a11yProps(3)} />
					<Tab label="回收站" {...a11yProps(4)} />
				</Tabs>
			</Grid>
			<Grid item xs={10}>
				<TabPanel value={value} index={0}>
					<SortButtons 
						setQuestionaires={setQuestionaires} 
						title="全部问卷" 
						index={sortIndex} 
						handle={handleSortIndexChange} 
						{...props} 
					/>
					{childPropsList.map((childProps) => <Questionare {...childProps} showType={-1}/>)}
				</TabPanel>
				<TabPanel value={value} index={1}>
					<SortButtons 
						setQuestionaires={setQuestionaires} 
						title="未发布问卷" 
						index={sortIndex} 
						handle={handleSortIndexChange} 
						{...props} 
					/>
					{childPropsList.map((childProps) => <Questionare {...childProps} showType={0}/>)}
				</TabPanel>
				<TabPanel value={value} index={2}>
					<SortButtons 
						setQuestionaires={setQuestionaires} 
						title="已发布问卷" 
						index={sortIndex} 
						handle={handleSortIndexChange} 
						{...props} 
					/>
					{childPropsList.map((childProps) => <Questionare {...childProps} showType={1}/>)}
				</TabPanel>
				<TabPanel value={value} index={3}>
					
					<SortButtons 
						setQuestionaires={setQuestionaires} 
						title="已完成问卷" 
						index={sortIndex} 
						handle={handleSortIndexChange} 
						{...props} 
					/>
					{childPropsList.map((childProps) => <Questionare {...childProps} showType={2}/>)}
				</TabPanel>
				<TabPanel value={value} index={4}>
					
					<SortButtons 
						setQuestionaires={setQuestionaires} 
						title="回收站" 
						index={sortIndex} 
						handle={handleSortIndexChange} 
						{...props} 
					/>
					{childPropsList.map((childProps) => <Questionare {...childProps} showType={3}/>)}
				</TabPanel>
				<TabPanel value={value} index={5}>
					<SortButtons 
						setQuestionaires={setQuestionaires} 
						title="搜索结果" 
						index={sortIndex} 
						handle={handleSortIndexChange} 
						{...props} 
					/>
					{childPropsList.map((childProps) => <Questionare {...childProps} showType={4}/>)}
				</TabPanel>
			</Grid>
    </Grid>
  );
}
