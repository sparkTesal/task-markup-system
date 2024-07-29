import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Typography, TextField, Button, Box, Paper, Grid, FormControlLabel, Switch, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import axios from 'axios';

function TaskMarkup() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [currentSpec, setCurrentSpec] = useState('');
  const [proposedSpec, setProposedSpec] = useState('');
  const [taskDescription, setTaskDescription] = useState('');
  const [isMarked, setIsMarked] = useState(false);

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/tasks/${id}`);
        setTask(response.data);
        setCurrentSpec(response.data.currentSpec);
        setProposedSpec(response.data.proposedSpec);
        setTaskDescription(response.data.taskDescription);
        setIsMarked(response.data.status === 'MARKED');
      } catch (error) {
        console.error('Error fetching task:', error);
      }
    };

    fetchTask();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/tasks/${id}`, {
        currentSpec,
        proposedSpec,
        taskDescription,
        status: isMarked ? 'MARKED' : 'INIT'
      });
      alert('Task updated successfully');
    } catch (error) {
      console.error('Error updating task:', error);
      alert('Failed to update task');
    }
  };

  const handleBack = () => {
    navigate('/');
  };

  if (!task) return <Typography>Loading...</Typography>;

  return (
    <Box sx={{ mt: 4 }}>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={handleBack}
        sx={{ mb: 2 }}
      >
        Back to Task List
      </Button>
      <Typography variant="h4" gutterBottom>
        Task Details: {task.title}
      </Typography>
      <Paper elevation={3} sx={{ p: 3, mb: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>ID:</strong> {task.id}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Status:</strong> {task.status}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1"><strong>Employee ID:</strong> {task.empId}</Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1">
              <strong>PR URL:</strong> 
              <Link 
                href={task.prUrl} 
                target="_blank" 
                rel="noopener noreferrer"
                sx={{ display: 'inline-flex', alignItems: 'center', ml: 1 }}
              >
                View on GitHub
                <OpenInNewIcon fontSize="small" sx={{ ml: 0.5 }} />
              </Link>
            </Typography>
          </Grid>
        </Grid>
      </Paper>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          label="Task Description"
          multiline
          rows={4}
          value={taskDescription}
          onChange={(e) => setTaskDescription(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Current Specification"
          multiline
          rows={4}
          value={currentSpec}
          onChange={(e) => setCurrentSpec(e.target.value)}
          margin="normal"
        />
        <TextField
          fullWidth
          label="Proposed Specification"
          multiline
          rows={4}
          value={proposedSpec}
          onChange={(e) => setProposedSpec(e.target.value)}
          margin="normal"
        />
        <FormControlLabel
          control={
            <Switch
              checked={isMarked}
              onChange={(e) => setIsMarked(e.target.checked)}
              color="primary"
            />
          }
          label="Mark as Completed"
        />
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Update Task
        </Button>
      </form>
    </Box>
  );
}

export default TaskMarkup;