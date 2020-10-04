import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { View } from 'react-native';
import {
  Text,
  Input,
  Picker,
  Form,
  Item,
  Label,
  Button,
  H2,
  H3,
  Card,
  CardItem,
  Body,
  Icon,
} from 'native-base';
import validator from 'validator';
import { format } from 'date-fns';
import DateTimePicker from '@react-native-community/datetimepicker';
import { userActions } from '../_actions';
import { ScrollView } from 'react-native-gesture-handler';

const EditProfileModal = ({ user, updateDetails }) => {
  const [firstName, setFirstName] = useState('');
  const [errorFirstName, setErrorFirstName] = useState('');

  const [lastName, setLastName] = useState('');
  const [errorLastName, setErrorLastName] = useState('');

  const [gender, setGender] = useState('');

  const [email, setEmail] = useState('');
  const [errorEmail, setErrorEmail] = useState('');

  const [password, setPassword] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');

  const [phoneNumber, setPhoneNumber] = useState('');
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');

  const [address, setAddress] = useState('');

  const [dateOfBirth, setDateOfBirth] = useState(Date.now());
  const [errorDOB, setErrorDOB] = useState('');

  const [emergencyContactName, setEmergencyContactName] = useState('');
  const [errorEmergencyContactName, setErrorEmergencyContactName] = useState('');

  const [emergencyContactAddress, setEmergencyContactAddress] = useState('');

  const [isFormValid, setIsFormValid] = useState(true);
  const [showDatePicker, setShowDatePicker] = useState(false);

  useEffect(() => {
    if (user) {
      if (user.firstName) setFirstName(user.firstName);
      if (user.lastName) setLastName(user.lastName);
      if (user.gender) setGender(user.gender);
      if (user.dateOfBirth) setDateOfBirth(user.dateOfBirth);
      if (user.phoneNumber) setPhoneNumber(user.phoneNumber);
      if (user.email) setEmail(user.email);
      if (user.address) setAddress(user.address);
      if (user.emergencyContact && user.emergencyContact.name)
        setEmergencyContactName(user.emergencyContact.name);
      if (user.emergencyContact && user.emergencyContact.address)
        setEmergencyContactAddress(user.emergencyContact.address);
    }
  }, [user]);

  const handleBlur = (event, name) => {
    switch (name) {
      case 'email':
        if (!email) setErrorEmail('E-mail is required');
        else if (!validator.isEmail(email)) setErrorEmail('E-mail address is invalid');
        else setErrorEmail('');
        break;
      case 'phoneNumber':
        if (!phoneNumber) setErrorEmail('Phone number is required');
        else if (!validator.isMobilePhone(phoneNumber))
          setErrorPhoneNumber('Phone number is invalid');
        else setErrorPhoneNumber('');
        break;
      case 'repeatPassword':
        if (password.length < 8) setErrorPassword('Password must be at least 8 characters long.');
        else if (!validator.equals(password, repeatPassword))
          setErrorPassword("Passwords don't match. Try again.");
        else setErrorPassword('');
        break;
      case 'firstName':
        if (!firstName) setErrorFirstName('First name is required');
        else if (!validator.isAlpha(firstName))
          setErrorFirstName('First name should contain only letters');
        else setErrorFirstName('');
        break;
      case 'lastName':
        if (!lastName) setErrorLastName('Last name is required');
        else if (!validator.matches(lastName, /^[a-z-]+$/i))
          setErrorLastName("Last name should contain only letters and '-'");
        else setErrorLastName('');
        break;
      case 'emergencyContactName':
        if (emergencyContactName && !validator.matches(emergencyContactName, /^[a-z-]+$/i))
          setErrorEmergencyContactName(
            "Emergency contact name should contain only letters and '-'"
          );
        else setErrorEmergencyContactName('');
        break;
    }

    validateForm();
  };

  const handleSave = () => {
    const newUser = {
      _id: user._id,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      email,
      password,
      phoneNumber,
      address,
      emergencyContact: { name: emergencyContactName, address: emergencyContactAddress },
    };
    updateDetails(newUser);
  };

  const handleDateChange = () => {
    if (!dateOfBirth) setErrorDOB('Date of birth is required');
    else setErrorDOB('');
    validateForm();
  };

  const validateForm = () => {
    if (
      (errorEmail ||
        errorFirstName ||
        errorLastName ||
        errorPassword ||
        errorPhoneNumber ||
        errorDOB ||
        errorEmergencyContactName) &&
      isFormValid === true
    )
      setIsFormValid(false);
    else if (isFormValid === true) setIsFormValid(true);
  };

  return (
    <View>
      <ScrollView style={{ marginTop: 35, paddingBottom: 15 }}>
        <Form style={{ backgroundColor: 'white' }}>
          <Card>
            <CardItem header>
              <H3>Personal</H3>
            </CardItem>
            <CardItem>
              <Body>
                <Item floatingLabel style={{ marginBottom: 10 }} error={!!errorFirstName}>
                  <Label>First name</Label>
                  <Input
                    onChangeText={text => setFirstName(text)}
                    onBlur={e => handleBlur(e, 'firstName')}
                    error={!!errorFirstName}
                    value={firstName}
                  />
                  {errorFirstName.length > 0 && <Icon name='md-alert' style={{ color: 'red' }} />}
                </Item>
                {errorFirstName.length > 0 && (
                  <Text style={{ color: 'red', marginLeft: 5, marginBottom: 10 }}>
                    {errorFirstName}
                  </Text>
                )}
                <Item floatingLabel error={!!errorLastName}>
                  <Label>Last name</Label>
                  <Input
                    onChangeText={text => setLastName(text)}
                    onBlur={e => handleBlur(e, 'lastName')}
                    value={lastName}
                  />
                  {errorLastName.length > 0 && <Icon name='md-alert' style={{ color: 'red' }} />}
                </Item>
                {errorLastName.length > 0 && (
                  <Text style={{ color: 'red', marginLeft: 5, marginBottom: 10 }}>
                    {errorLastName}
                  </Text>
                )}
                <View
                  style={{ marginTop: 10, marginBottom: 0 }}
                  onPress={() => setShowDatePicker(true)}
                >
                  <Label style={{ color: '#888888', fontSize: 15, marginBottom: 5 }}>
                    Date of birth
                  </Label>
                  {showDatePicker ? (
                    <DateTimePicker
                      value={new Date(dateOfBirth)}
                      onChange={handleDateChange}
                      mode={'date'}
                      style={{ marginBottom: 0 }}
                    />
                  ) : (
                    <Label style={{ fontSize: 15 }}>
                      {format(new Date(dateOfBirth), 'd MMM yyyy')}
                    </Label>
                  )}
                </View>
                <Item picker style={{ marginRight: 2, marginLeft: 6, marginBottom: 15 }}>
                  <Label>Gender</Label>
                  <Picker
                    mode='dropdown'
                    selectedValue={gender}
                    onValueChange={value => setGender(value)}
                  >
                    <Picker.Item label='male' value='male' />
                    <Picker.Item label='female' value='female' />
                  </Picker>
                </Item>
              </Body>
            </CardItem>
          </Card>

          <Card>
            <CardItem header>
              <H3>Contact</H3>
            </CardItem>
            <CardItem>
              <Body>
                <Item floatingLabel style={{ marginBottom: 10 }} error={!!errorEmail}>
                  <Label>E-mail address</Label>
                  <Input
                    onChangeText={text => setEmail(text)}
                    onBlur={e => handleBlur(e, 'email')}
                    value={email}
                    required
                  />
                  {errorEmail.length > 0 && <Icon name='md-alert' style={{ color: 'red' }} />}
                </Item>
                {errorEmail.length > 0 && (
                  <Text style={{ color: 'red', marginLeft: 5, marginBottom: 10 }}>
                    {errorEmail}
                  </Text>
                )}
                <Item floatingLabel style={{ marginBottom: 10 }} error={!!errorPhoneNumber}>
                  <Label>Phone number</Label>
                  <Input
                    onChangeText={text => setPhoneNumber(text)}
                    onBlur={e => handleBlur(e, 'phoneNumber')}
                    value={phoneNumber}
                    required
                  />
                  {errorPhoneNumber.length > 0 && <Icon name='md-alert' style={{ color: 'red' }} />}
                </Item>
                {errorPhoneNumber.length > 0 && (
                  <Text style={{ color: 'red', marginLeft: 5, marginBottom: 10 }}>
                    {errorPhoneNumber}
                  </Text>
                )}
                <Item floatingLabel style={{ marginBottom: 10 }}>
                  <Label>Address</Label>
                  <Input
                    onChangeText={text => setAddress(text)}
                    onBlur={e => handleBlur(e, 'address')}
                    value={address}
                  />
                </Item>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <H3>Emergency contact</H3>
            </CardItem>
            <CardItem>
              <Body>
                <Item
                  floatingLabel
                  style={{ marginBottom: 10 }}
                  error={!!errorEmergencyContactName}
                >
                  <Label>Name</Label>
                  <Input
                    onChangeText={text => setEmergencyContactName(text)}
                    onBlur={e => handleBlur(e, 'emergencyContactName')}
                    error={errorEmergencyContactName.length > 0 ? true : false}
                    value={emergencyContactName}
                  />
                  {errorEmergencyContactName.length > 0 && (
                    <Icon name='md-alert' style={{ color: 'red' }} />
                  )}
                </Item>
                {errorEmergencyContactName.length > 0 && (
                  <Text style={{ color: 'red', marginLeft: 5, marginBottom: 10 }}>
                    {errorEmergencyContactName}
                  </Text>
                )}
                <Item floatingLabel>
                  <Label>Address</Label>
                  <Input
                    onChangeText={text => setEmergencyContactName(text)}
                    onBlur={e => handleBlur(e, 'emergencyContactAddress')}
                    value={emergencyContactAddress}
                  />
                </Item>
              </Body>
            </CardItem>
          </Card>
          <Card>
            <CardItem header>
              <H3>Change password</H3>
            </CardItem>
            <CardItem>
              <Body>
                <Item floatingLabel style={{ marginBottom: 10 }} error={!!errorPassword}>
                  <Label>Password</Label>
                  <Input
                    onChangeText={text => setPassword(text)}
                    onBlur={e => handleBlur(e, 'password')}
                    value={password}
                    secureTextEntry
                  />
                  {errorPassword.length > 0 && <Icon name='md-alert' style={{ color: 'red' }} />}
                </Item>
                {errorPassword.length > 0 && (
                  <Text style={{ color: 'red', marginLeft: 5, marginBottom: 10 }}>
                    {errorPassword}
                  </Text>
                )}
                <Item floatingLabel error={!!errorPassword}>
                  <Label>Repeat password</Label>
                  <Input
                    onChangeText={setRepeatPassword}
                    onBlur={e => handleBlur(e, 'repeatPassword')}
                    secureTextEntry
                  />
                  {errorPassword.length > 0 && <Icon name='md-alert' style={{ color: 'red' }} />}
                </Item>
              </Body>
            </CardItem>
          </Card>
        </Form>

        <Button
          style={{
            marginTop: 30,
            marginBottom: 30,
            alignSelf: 'flex-end',
            paddingHorizontal: 20,
          }}
          disabled={!isFormValid}
          onPress={handleSave}
        >
          <Text>Save</Text>
        </Button>
      </ScrollView>
    </View>
  );
};

const mapStateToProps = (state, props) => ({
  user: state.auth.user,
});

const mapDispatchToProps = {
  updateDetails: userActions.updateDetails,
};

export default connect(mapStateToProps, mapDispatchToProps)(EditProfileModal);
