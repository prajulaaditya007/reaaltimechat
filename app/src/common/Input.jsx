import {Text, TextInput, View} from 'react-native';

function Input({
  title,
  value,
  error,
  setValue,
  setError,
  secureTextEntry = false,
}) {
  return (
    <View>
      <Text
        style={{
          color: error ? '#ff6347' : '#70747a',
          marginVertical: 6,
          paddingLeft: 4,
        }}>
        {error ? error : title}
      </Text>
      <TextInput
        autoCapitalize="none"
        autoComplete="off"
        onChangeText={text => {
          setValue(text);
          if (error) {
            setError('');
          }
        }}
        secureTextEntry={secureTextEntry}
        style={{
          backgroundColor: error ? '#ece9e9' : '#e1e2e4',
          borderRadius: 10,
          borderWidth: 1,
          borderColor: error ? '#ff6347' : 'transparent',
          height: 52,
          paddingHorizontal: 16,
          fontSize: 16,
        }}
        value={value}
      />
    </View>
  );
}

export default Input;
