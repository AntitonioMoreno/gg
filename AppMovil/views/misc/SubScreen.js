import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
//Componentes
import { TitleSreen } from '../../components/misc/components';
import HelpScreen from './helpScreen';
import BalanceReport from './balanceReportScreen';
import BuyGGPoints from './buyGGPointsScreen';
import AccountScreen from './accountScreen';

export default function SubScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  const { screen } = route.params;
  

  const handleNavigate = () => {
    navigation.navigate('App');
  };
  // Aquí puedes usar screen para decidir qué contenido renderizar
  // Por ejemplo:
  let screenContent;

  switch (screen) {
    case 'help':
      screenContent = <HelpScreen/>;
      break;
    case 'balanceReport':
      screenContent = <BalanceReport/>;
      break;
    case 'buyPoints':
        screenContent = <BuyGGPoints/>;
        break;
    case 'account':
            screenContent = <AccountScreen/>;
        break;
    case 'payment':
            screenContent = <AccountScreen/>;
        break;
    // Agrega más casos según sea necesario
    default:
      screenContent = <Text>Aqui renderizamos pantallas secundarias</Text>;
  }

  return (
    <View style={{flex: 1}}>
        <TitleSreen><TouchableOpacity onPress={() => handleNavigate()} style={{margin: '2%', flexDirection: 'row', alignItems: 'center'}}>
            <MaterialCommunityIcons name='keyboard-backspace' color='#000'size={22}/><Text style={{marginLeft: 5}}>Regresar</Text>
        </TouchableOpacity></TitleSreen>
        {screenContent}
    </View>
  );
}
