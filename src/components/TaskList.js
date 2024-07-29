import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Typography, List, ListItem, ListItemText, Chip, Box, FormControl, InputLabel, Select, MenuItem } from '@mui/material';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [empIdFilter, setEmpIdFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data.tasks);
        setFilteredTasks(response.data.tasks);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };

    fetchTasks();
  }, []);

  useEffect(() => {
    let result = tasks;
    if (empIdFilter) {
      result = result.filter(task => task.empId === empIdFilter);
    }
    if (statusFilter) {
      result = result.filter(task => task.status === statusFilter);
    }
    setFilteredTasks(result);
  }, [tasks, empIdFilter, statusFilter]);

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Task List
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Employee ID</InputLabel>
          <Select
            value={empIdFilter}
            label="Employee ID"
            onChange={(e) => setEmpIdFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            {[...new Set(tasks.map(task => task.empId))].map(empId => (
              <MenuItem key={empId} value={empId}>{empId}</MenuItem>
            ))}
          </Select>
        </FormControl>
        <FormControl sx={{ minWidth: 120 }}>
          <InputLabel>Status</InputLabel>
          <Select
            value={statusFilter}
            label="Status"
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="INIT">INIT</MenuItem>
            <MenuItem value="MARKED">MARKED</MenuItem>
          </Select>
        </FormControl>
      </Box>
      <List>
        {filteredTasks.map((task) => (
          <ListItem key={task.id} button component={Link} to={`/task/${task.id}`}>
            <ListItemText primary={task.title} secondary={`Employee ID: ${task.empId}`} />
            <Chip 
              label={task.status} 
              color={task.status === 'MARKED' ? 'success' : 'default'}
              sx={{ ml: 2 }}
            />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default TaskList;