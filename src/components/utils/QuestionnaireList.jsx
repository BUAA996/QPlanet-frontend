import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { Button, Grid } from '@material-ui/core';
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
}));

function createProps(index) {
	return {
		"id": index,
		"title": "假装这是个问卷调查",
		"description": "这一看就是个很正经的问卷调查",
		"type": 0,
		"count": 123,
		"hash": "ASDSAT12314SDA@#4!@#SD!@$E",
		"status": index % 3,
		"createTime": "2021.8.21 10:30",
		"uploadTime": "2021.8.21 10:35",
	}
}

function getProps() {
	var res = new Array(10)
	for(let i = 0;i < 10; ++i) {
		res[i] = createProps(i);
	}
	return res;
}

export default function QuestionnaireList(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);


	// var childPropsList = getProps();
	var childPropsList = props.Questionares;
	// console.log(childPropsList)
	// console.log(props.Questionares)
  const handleChange = (event, newValue) => {
    setValue(newValue);
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
					全部问卷
					&nbsp;<Button variant="contained" color="primary" onClick={() => {setValue(4)}}> 测试一下搜索能不能用 (x </Button>
					{childPropsList.map((childProps) => <Questionare {...childProps} showType={-1}/>)}
				</TabPanel>
				<TabPanel value={value} index={1}>
					未发布问卷
					{childPropsList.map((childProps) => <Questionare {...childProps} showType={0}/>)}
				</TabPanel>
				<TabPanel value={value} index={2}>
					已发布问卷
					{childPropsList.map((childProps) => <Questionare {...childProps} showType={1}/>)}
				</TabPanel>
				<TabPanel value={value} index={3}>
					已完成问卷
					{childPropsList.map((childProps) => <Questionare {...childProps} showType={2}/>)}
				</TabPanel>
				<TabPanel value={value} index={4}>
					回收站
					{childPropsList.map((childProps) => <Questionare {...childProps} showType={3}/>)}
				</TabPanel>
				<TabPanel value={value} index={5}>
					搜索结果
					{childPropsList.map((childProps) => <Questionare {...childProps} showType={4}/>)}
				</TabPanel>
			</Grid>
      
      
    </Grid>
  );
}
