import React, { useState } from "react";
import {
  extendTheme,
  Box,
  Text,
  Heading,
  NativeBaseProvider,
  Progress,
  Select,
  CheckIcon,
  Input,
  VStack,
  HStack,
  IconButton,
  Icon,
  ScrollView,
} from "native-base";
import { XMLParser } from "fast-xml-parser";
import { AntDesign, FontAwesome } from "@expo/vector-icons";

let maxValue = 0;
let minValue = 0;
let percent = 0;
let trackColor = "";
let result = "";
let avg = 0;
const newColorTheme = {
  colors:"#a5f3fc"

};
const theme = extendTheme({ colors: newColorTheme });

const Main = () => {

  const [loading, setLoading] = useState(true);
  const [selectValue, setValue] = useState("고등어");
  const [minP, setMinP] = useState("");
  const [maxP, setMaxP] = useState("");
  const [putP, setPutP] = useState("");
  const [percentP, setPercent] = useState("");
  const [colorT, setColor] = useState("");
  const [textResult, setResult] = useState("");

  const calPrice = () => {
    let arr = new Array();
    minValue, (maxValue = 0);
    try {
      const xhr = new XMLHttpRequest();
      var url = `http://openAPI.seoul.go.kr:8088/414265787362736537335349644466/xml/ListNecessariesPricesService/1/100/ /${selectValue}`; /* URL */
      xhr.open("GET", url);
      xhr.onreadystatechange = function () {
        if (this.readyState == xhr.DONE) {
          if (xhr.status == 200 || xhr.status == 201) {
            let parser = new XMLParser();
            let xmlDoc = parser.parse(this.responseText, "text1/xml");
 
            xmlDoc.ListNecessariesPricesService.row.forEach((item) => {
              APrice = `${item.A_PRICE} 원`; //가격
              arr.push(`${item.A_PRICE}`);
            });
            setPrice();

            data = xmlDoc.ListNecessariesPricesService.row;

            setLoading(false);
          }
        }
      };
      xhr.send("");
    } catch (error) {
      console.log(error);
    }
    const setPrice = () => {
      //배열에서 0 없애기
      for(let i = 0; i < arr.length; i++) {
        if(arr[i] === '0')  {
          arr.splice(i, 1);
          i--;
        }
      }
  
      //최저가 최고가
      maxValue = Math.max.apply(null, arr);
      minValue = Math.min.apply(null, arr);
      setMinP(minValue);
      setMaxP(maxValue);
      //입력값과 비교하기
      percent = Math.round(
        ((parseInt(putP) - minValue) / (maxValue - minValue)) * 100
      );
      //평균값
      avg = (minValue + maxValue)/2
      setPercent(percent);
      let command = "";
      if (percent <= 33) {
        trackColor = "tertiary.600";
        command = ""
        setColor(trackColor);
      } else if (percent > 34 && percent < 67) {
        trackColor = "info.600";
        setColor(trackColor);
      } else if (percent >= 67) {
        trackColor = "danger.700";
        setColor(trackColor);
      }

      if(parseInt(putP) > avg ) {
        let dif1 = parseInt(putP) - avg;
        result = `${selectValue}` + "가격 기준 내 " + percent + "%로,\n평균 가격보다 " + dif1 + "원 더 비쌉니다🥺\n다른 상품을 구매하는 건 어떨까요?💸"
        setResult(result)
      } else {
        let dif2 = avg - parseInt(putP);
        result = `${selectValue}`+ "가격 기준 내 " + percent + "%로,\n평균 가격보다 " + dif2 + "원 더 저렴합니다🤩\n구매를 추천드려요🛒"
        setResult(result) 
      }

      
      console.log(maxValue + "  " + minValue + "  " + percent + "  and  " + trackColor);
   
      return maxValue, minValue;
    };
    //입력값 계산함수
    // const calInput = () => {
    // //임의의 범위 [a, b]에서 숫자 x (a <= x <= b)가 주어졌을때 해당 범위내에서 x는 몇 %인지 변환하는 공식
    // percent = (parseInt(putP)-minValue)/(maxValue - minValue)
    // }
  };

  return (
    <NativeBaseProvider theme={theme}>
      <ScrollView scrollEnabled={false} backgroundColor="white">
      <Box ml={10} mr={10}>
        <Heading size="lg" h="8" mb={10} pd={15} mt={20}>
          지금 이 가격, 적당할까? 🤔
        </Heading>
        <VStack>
          
          <Input
            placeholder="가격을 입력하세요!"
            fontSize="m"
            h="10"
            InputLeftElement={
              <Icon
                as={FontAwesome}
                name="won"
                size={5}
                ml="3"
                color="muted.400"
              />
            }
            value={putP}
            keyboardType="numeric"
            onChangeText={(itemValue) => setPutP(itemValue)}
          />
          

          <Box
            justifyItems="center"
            alignItems="center"
            flexDirection="row"
            pd="5"
          >
            <Select
              id="selectN"
              w="300"
              h="10"
              fontSize="m"
              accessibilityLabel="품목을 선택하세요"
              placeholder="품목을 선택하세요"
              _selectedItem={{
                bg: "coolGray.300",
                endIcon: <CheckIcon size="5" />,
              }}
              size="sm"
              mt={10}
              mb={10}
              onValueChange={(itemValue) => setValue(itemValue)}
              // onClose = {onClose}
              
            >
              <Select.Item label="고등어" value="고등어" />
              <Select.Item label="달걀" value="달걀" />
              <Select.Item label="닭고기" value="닭고기" />
              <Select.Item label="돼지고기" value="돼지고기" />
              <Select.Item label="명태" value="명태" />
              <Select.Item label="무" value="무" />
              <Select.Item label="배" value="배" />
              <Select.Item label="배추" value="배추" />
              <Select.Item label="사과" value="사과" />
              <Select.Item label="상추" value="상추" />
              <Select.Item label="쇠고기" value="쇠고기" />
              <Select.Item label="쌀" value="쌀" />
              <Select.Item label="애호박" value="애호박" />
              <Select.Item label="양파" value="양파" />
              <Select.Item label="오이" value="오이" />
              <Select.Item label="오징어" value="오징어" />
              <Select.Item label="조기" value="조기" />
              <Select.Item label="호박" value="호박" />
            </Select>

            <IconButton
              onPress={calPrice}
              alignItems="center"
              icon={<Icon as={AntDesign} name="checkcircleo" />}
              borderRadius="full"
              _icon={{
                color: "blue.900",
                size: "lg",
              }}
              _hover={{
                bg: "blue.600:alpha.20",
              }}
              _pressed={{
                bg: "blue.600:alpha.20",
                _icon: {
                  name: "emoji-flirt",
                },
                _ios: {
                  _icon: {
                    size: "2xl",
                  },
                },
              }}
              _ios={{
                _icon: {
                  size: "2xl",
                },
              }}
            />
          </Box>

            <Progress
              minWidth="100%"
              value={percentP}
              bg="coolGray.300"
              _filledTrack={{ bg: `${colorT}` }}
              size="md"
            />

   
  
        <HStack>
          <Box boxSize="12" position="absolute" _text={{ textAlign: "center" }}>
            최저가 {minP}
          </Box>
          <Box
            boxSize="12"
            left="287"
            position="absolute"
            _text={{ textAlign: "center" }}
          >
            최고가 {maxP}
          </Box>
        </HStack>
          <Box marginTop={"65"} >
            <Text fontSize={"xl"} bold >{textResult}</Text>
   
          </Box>
        </VStack>
      </Box>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Main;
