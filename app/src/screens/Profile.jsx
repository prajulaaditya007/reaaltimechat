import {View, Text, Image, TouchableOpacity} from 'react-native';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import useGlobal from '../core/global';
import {launchImageLibrary} from 'react-native-image-picker';
import utils from '../core/utils';

// Add functionality to launch the camera also for taking photos
function ProfileImage() {
  return (
    <TouchableOpacity
      style={{marginBottom: 20}}
      onPress={() => {
        launchImageLibrary({includeBase64: true}, response => {
          utils.log('launchImageLibrary', response);
          if (response.didCancel) return;
          const file = response.assets[0];
          // Will handle uploading afterwards
        })
          .then(() => utils.log('then method', response))
          .catch(error => utils.log('launchImageLibrary Error', error));
      }}>
      <Image
        source={require('../assets/profile.png')}
        style={{
          width: 180,
          height: 180,
          borderRadius: 40,
          backgroundColor: '#e0e0e0',
        }}
      />
      <View
        style={{
          position: 'absolute',
          bottom: -10,
          right: -10,
          backgroundColor: '#202020',
          width: 40,
          height: 40,
          borderRadius: 20,
          alignItems: 'center',
          justifyContent: 'center',
          borderWidth: 3,
          borderColor: 'white',
        }}>
        <FontAwesomeIcon icon="pencil" size={15} color="#d0d0d0" />
      </View>
    </TouchableOpacity>
  );
}

function ProfileLogOut() {
  const logout = useGlobal(state => state.logout);
  return (
    <TouchableOpacity
      onPress={logout}
      style={{
        flexDirection: 'row',
        height: 52,
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 26,
        backgroundColor: '#202020',
        marginTop: 40,
      }}>
      <FontAwesomeIcon
        icon={'right-from-bracket'}
        size={20}
        color={'#d0d0d0'}
        style={{marginRight: 12}}
      />
      <Text
        style={{
          fontWeight: 'bold',
          color: '#d0d0d0',
        }}>
        Log Out
      </Text>
    </TouchableOpacity>
  );
}
function ProfileScreen() {
  const user = useGlobal(state => state.user);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        paddingTop: 100,
      }}>
      <ProfileImage />
      <Text
        style={{
          textAlign: 'center',
          color: '#303030',
          fontSize: 20,
          fontWeight: 'bold',
          marginBottom: 6,
        }}>
        {user.name}
      </Text>
      <Text
        style={{
          textAlign: 'center',
          color: '#606060',
          fontSize: 14,
        }}>
        @{user.username}
      </Text>

      <ProfileLogOut />
    </View>
  );
}

export default ProfileScreen;
