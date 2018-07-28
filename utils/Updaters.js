import { EventRegister } from 'react-native-event-listeners'

export const UpdateProfile = () => {
	EventRegister.emit('UpdateProfile', null)
}

export default {
	UpdateProfile,
};