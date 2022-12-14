import React, { useState } from "react";
import {
  extendTheme,
  View,
  Box,
  Text,
  Heading,
  Center,
  NativeBaseProvider,
  Progress,
  Select,
  CheckIcon,
  VStack,
  Spinner,
  ScrollView,
  Pressable,
} from "native-base";
import { XMLParser } from "fast-xml-parser";

let maxValue = 0;
let minValue = 0;
const newColorTheme = {
  brand: {
    900: "#a5f3fc",
  },
};
const theme = extendTheme({ colors: newColorTheme });

const Main = () => {
  const [loading, setLoading] = useState(true);
  const [selectValue, setValue] = useState("고등어");
  const [selectGu, setGu] = useState("용산구");
  const [minP, setMinP] = useState("");
  const [maxP, setMaxP] = useState("");

  let arr = new Array();
  minValue, (maxValue = 0);
  try {
    const xhr = new XMLHttpRequest();
    var url = `http://openAPI.seoul.go.kr:8088/414265787362736537335349644466/xml/ListNecessariesPricesService/1/100/ /${selectValue}/2022-11/ /${selectGu}`; /* URL */
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
          for (let i = 0; i < arr.length; i++) {
            if (arr[i] === "0") {
              arr.splice(i, 1);
              i--;
            }
          }
          data = xmlDoc.ListNecessariesPricesService.row;

          data.sort(function (a, b) {
            return a.A_PRICE - b.A_PRICE;
          });

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
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === "0") {
        arr.splice(i, 1);
        i--;
      }
    }

    maxValue = Math.max.apply(null, arr);
    minValue = Math.min.apply(null, arr);
    setMinP(minValue);
    setMaxP(maxValue);
    //입력값과 비교하기
  };

  return (
    <NativeBaseProvider bg="white" theme={theme}>
      <View bg="white">
        <Box ml={10} mr={10} bg="white">
          <Heading size="lg" h="8" mb={10} pd={15} mt={20}>
            우리 동네 최저가 찾기📍
          </Heading>
          <VStack>
            <Box
              justifyItems="center"
              alignItems="center"
              flexDirection="row"
              pd="2"
            >
              <Select
                id="selectN"
                w="160"
                h="10"
                accessibilityLabel="자치구"
                placeholder="자치구"
                _selectedItem={{
                  bg: "coolGray.300",
                  endIcon: <CheckIcon size="5" />,
                }}
                size="sm"
                mt={2}
                mb={10}
                onValueChange={(itemValue) => setGu(itemValue)}
                // onClose = {onClose}
              >
                <Select.Item label="강남구" value="강남구" />
                <Select.Item label="강동구" value="강동구" />
                <Select.Item label="강북구" value="강북구" />
                <Select.Item label="강서구" value="강서구" />
                <Select.Item label="관악구" value="관악구" />
                <Select.Item label="광진구" value="광진구" />
                <Select.Item label="구로구" value="구로구" />
                <Select.Item label="금천구" value="금천구" />
                <Select.Item label="노원구" value="노원구" />
                <Select.Item label="도봉구" value="도봉구" />
                <Select.Item label="동대문구" value="동대문구" />
                <Select.Item label="동작구" value="동작구" />
                <Select.Item label="마포구" value="마포구" />
                <Select.Item label="서대문구" value="서대문구" />
                <Select.Item label="서초구" value="서초구" />
                <Select.Item label="성동구" value="성동구" />
                <Select.Item label="성북구" value="성북구" />
                <Select.Item label="송파구" value="송파구" />
                <Select.Item label="양천구" value="양천구" />
                <Select.Item label="영등포구" value="영등포구" />
                <Select.Item label="용산구" value="용산구" />
                <Select.Item label="은평구" value="은평구" />
                <Select.Item label="종로구" value="종로구" />
                <Select.Item label="중구" value="중구" />
                <Select.Item label="중랑구" value="중랑구" />
              </Select>

              <Select
                id="selectN"
                w="160"
                h="10"
                accessibilityLabel="품목을 선택하세요"
                placeholder="품목"
                _selectedItem={{
                  bg: "coolGray.300",
                  endIcon: <CheckIcon size="5" />,
                }}
                size="sm"
                mt={2}
                mb={10}
                ml={3}
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
            </Box>

            <ScrollView bg="white">
              {loading ? (
                <>
                  <Box
                    alignItems="center"
                    w="320"
                    h="500"
                    bg="white"
                    justifyContent="center"
                  >
                    <Spinner
                      accessibilityLabel="Loading posts"
                      alignContent="center"
                    />
                  </Box>
                </>
              ) : null}
              {!loading ? (
                <>
                  {data.map((seq, i) => (
                    <Box
                      alignItems="center"
                      key={i}
                      maxW="96"
                      maxH="200"
                      shadow="3"
                      bg="white"
                      p="3"
                    >
                      <Pressable
                        onPress={() => console.log(`${seq.A_PRICE}`)}
                        rounded="8"
                        overflow="hidden"
                        borderWidth="1"
                        borderColor="coolGray.300"
                        w="330"
                        h="120"
                        shadow="1"
                        bg="white"
                        p="1"
                      >
                        <Box>
                          <Text
                            mt="3"
                            fontWeight="medium"
                            fontSize="xl"
                            color="lightBlue.900"
                            bold
                          >
                            {`  ` + `${seq.M_GU_NAME}`} {`${seq.M_NAME}`}
                          </Text>
                          <Text mt="2" fontSize="sm" color="coolGray.700">
                            {`  ` + `${seq.A_NAME}`}
                          </Text>
                          <Text mt="2" fontSize="sm" bold color="lightBlue.700">
                            {" "}
                            {` ` + `${seq.A_PRICE}` + `원`}{" "}
                          </Text>
                        </Box>
                      </Pressable>
                    </Box>
                  ))}
                </>
              ) : null}
            </ScrollView>
          </VStack>
        </Box>
      </View>
    </NativeBaseProvider>
  );
};

export default Main;
