import {Text, TouchableOpacity} from 'react-native';

function Button({title, onPress}) {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: '#1f0c1c',
        borderRadius: 10,
        height: 52,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 20,
      }}
      onPress={onPress}>
      <Text
        style={{
          color: 'white',
          fontSize: 16,
          fontWeight: 'bold',
        }}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

export default Button;
