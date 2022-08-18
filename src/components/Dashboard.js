import React, { Component } from 'react';
import axios from 'axios';
import { Container } from '@chakra-ui/react';
import { Alert, AlertIcon, Heading } from '@chakra-ui/react';
import { Grid, GridItem, Button } from '@chakra-ui/react';
import HabitModal from './Modal';
import HabitCard from './HabitCard';

const SERVER = process.env.REACT_APP_SERVER_URL;

class Dashboard extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: undefined,
			habits: 0,
			showModal: false,
		};
	}
	  handleOnHide = () => {
		this.setState({
		  showModal: false,
		});
	  };
	
	  handleOnShowModal = () => {
		this.setState({
		  showModal: true,
		});
	  };

	componentDidMount = () => {
		this.getBackend();
	};

	getBackend = async () => {
		await axios
			.get(`${SERVER}/habits`)
			.then((res) => {
				console.log(res.data);
			})
			.catch((err) => {
				console.error(err);
			});
    };
    
    
	render() {
		
		const totalHabits = this.state.habits;
		return (
			<>
				<Heading>This will be the dashboard for our habits!</Heading>
				
				<HabitCard  count={this.state.count} habit_name={'jellybean'}/>
				<Button as={'button'} onClick={this.handleOnShowModal}>Modal</Button>
                <Container>
                    <Grid templateColumns='repeat(5, 1fr)' gap={6}>
                        <GridItem w='100%' h='10' bg='red.400'/>
                        <GridItem w='100%' h='10' bg='red.400'/>
                        <GridItem w='100%' h='10' bg='red.400'/>
                        <GridItem w='100%' h='10' bg='red.400'/>
                        <GridItem w='100%' h='10' bg='red.400'/>
                    </Grid>
                </Container>

				<HabitModal showModal={this.state.showModal} onHide={this.handleOnHide} handleOnHide={this.handleOnHide} />

				{totalHabits === 0 && (
					<Alert status='error'>
						<AlertIcon />
						Looks like you don't have any habits!
					</Alert>
				)}
			</>
		);
	}
}

export default Dashboard;


