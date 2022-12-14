import React, { useState, useEffect } from "react";
import {
  ScrollView,
  Pressable,
  Text,
  Box,
  HStack,
  Heading,
  Spacer,
  Flex,
  Badge,
  Center,
  NativeBaseProvider,
  VStack,
  Divider,
  Input,
  Icon,
  Skeleton,
  Modal,
  PresenceTransition,
} from "native-base";
import { XMLParser } from "fast-xml-parser";
import { Ionicons } from "@expo/vector-icons";
import { unescape } from "he";

var title, content, date, vwcode;
const Notice = () => {
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [state, setState] = useState({
    title: "",
    date: "",
    content: "",
  });
  try {
    const xhr = new XMLHttpRequest();
    var url = `http://openapi.seoul.go.kr:8088/6d4e4556616273653131385772474f4f/xml/VwNews/1/10/`; /* URL */
    xhr.open("GET", url);
    xhr.onreadystatechange = function () {
      if (this.readyState == xhr.DONE) {
        if (xhr.status == 200 || xhr.status == 201) {
          let parser = new XMLParser();
          let xmlDoc = parser.parse(this.responseText, "text/xml");
          xmlDoc.VwNews.row.forEach((item) => {});
          data = xmlDoc.VwNews.row;
          console.log("3333");
          setLoading(false);
        }
      }
    };
    xhr.send("");
  } catch (error) {
    console.log(error);
  }

  const popUp = (mTitle, mDate, mContent) => {
    let eTitle = "",
      eContent = " ";
    eTitle = mTitle;
    eContent = mContent;
    eTitle = unescape(eTitle);
    eContent = unescape(mContent);
    setState({
      title: eTitle,
      date: mDate,
      content: eContent,
    });
    setShowModal(true);
  };
  return (
    <NativeBaseProvider>
      <ScrollView w={["400", "300"]} h="80" centerContent="true" mt={15}>
        <VStack flex={1}>
          <VStack
            w="100%"
            maxW="600"
            ml="2"
            borderWidth="1"
            space={8}
            overflow="hidden"
            rounded="md"
            _dark={{
              borderColor: "coolGray.500",
            }}
            _light={{
              borderColor: "coolGray.200",
            }}
          >
            {loading ? (
              <>
                <Box>
                  <HStack
                    space={12}
                    rounded="md"
                    shadow={3}
                    borderWidth="1"
                    borderColor="coolGray.300"
                    p="5"
                  >
                    <VStack flex="1" space="5">
                      <Skeleton
                        startColor="pink.400"
                        size="20"
                        h="3"
                        rounded="full"
                      />
                      <Skeleton rounded="full" size="200" h="5" />
                      <Skeleton size="300" h="3" rounded="full" />
                      <Skeleton size="150" h="3" rounded="full" />
                    </VStack>
                  </HStack>
                </Box>

                <Box>
                  <HStack
                    space={12}
                    rounded="md"
                    shadow={3}
                    borderWidth="1"
                    borderColor="coolGray.300"
                    p="5"
                  >
                    <VStack flex="1" space="5">
                      <Skeleton
                        startColor="pink.400"
                        size="20"
                        h="3"
                        rounded="full"
                      />
                      <Skeleton rounded="full" size="200" h="5" />
                      <Skeleton size="300" h="3" rounded="full" />
                      <Skeleton size="150" h="3" rounded="full" />
                    </VStack>
                  </HStack>
                </Box>

                <Box>
                  <HStack
                    space={12}
                    rounded="md"
                    shadow={3}
                    borderWidth="1"
                    borderColor="coolGray.300"
                    p="5"
                  >
                    <VStack flex="1" space="5">
                      <Skeleton
                        startColor="pink.400"
                        size="20"
                        h="3"
                        rounded="full"
                      />
                      <Skeleton rounded="full" size="200" h="5" />
                      <Skeleton size="300" h="3" rounded="full" />
                      <Skeleton size="150" h="3" rounded="full" />
                    </VStack>
                  </HStack>
                </Box>

                <Box>
                  <HStack
                    space={12}
                    shadow={3}
                    borderWidth="1"
                    borderColor="coolGray.300"
                    p="5"
                  >
                    <VStack flex="1" space="5">
                      <Skeleton
                        startColor="pink.400"
                        size="20"
                        h="3"
                        rounded="full"
                      />
                      <Skeleton rounded="full" size="200" h="5" />
                      <Skeleton size="300" h="3" rounded="full" />
                      <Skeleton size="150" h="3" rounded="full" />
                    </VStack>
                  </HStack>
                </Box>
              </>
            ) : null}
          </VStack>
          {!loading ? (
            <>
              {data.map((seq, i) => (
                <Box alignItems="center" key={i} padding="2" ml="1">
                  <Pressable
                    onPress={() =>
                      popUp(
                        `${seq.N_TITLE}`,
                        `${seq.REG_DATE}`,
                        `${seq.N_CONTENTS}`
                      )
                    }
                    minW="96"
                  >
                    {({ isHovered, isFocused, isPressed }) => {
                      return (
                        <Box
                          bg={
                            isPressed
                              ? "coolGray.200"
                              : isHovered
                              ? "coolGray.200"
                              : "coolGray.100"
                          }
                          style={{
                            transform: [
                              {
                                scale: isPressed ? 0.96 : 1,
                              },
                            ],
                          }}
                          p="5"
                          rounded="8"
                          shadow={3}
                          borderWidth="1"
                          borderColor="coolGray.300"
                        >
                          <HStack alignItems="center">
                            <Badge
                              bg="pink.400"
                              _text={{
                                color: "white",
                              }}
                              variant="solid"
                              rounded="4"
                            >
                              {`${seq.N_EVENT_NAME}`}
                            </Badge>
                            <Spacer />
                            <Text fontSize={10} color="coolGray.800">
                              {`${seq.REG_DATE}`}
                            </Text>
                          </HStack>
                          <Text
                            color="coolGray.800"
                            mt="3"
                            fontWeight="medium"
                            fontSize="xl"
                            isTruncated
                          >
                            {unescape(`${seq.N_TITLE}`)}
                          </Text>
                          <Text
                            mt="2"
                            fontSize="sm"
                            color="coolGray.700"
                            isTruncated
                          >
                            {unescape(`${seq.N_CONTENTS}`)}
                          </Text>
                          <Flex>
                            {isFocused ? (
                              <Text
                                mt="2"
                                fontSize={12}
                                fontWeight="medium"
                                textDecorationLine="underline"
                                color="darkBlue.600"
                                alignSelf="flex-start"
                              >
                                더보기
                              </Text>
                            ) : (
                              <Text
                                mt="2"
                                fontSize={12}
                                fontWeight="medium"
                                color="darkBlue.600"
                              >
                                더보기
                              </Text>
                            )}
                          </Flex>
                          <Modal
                            _backdrop={true}
                            bgColor="blueGray.200"
                            isOpen={showModal}
                            onClose={() => setShowModal(false)}
                          >
                            <Modal.Content w="400" h="600">
                              <Modal.CloseButton />
                              <Heading fontSize="xl"> </Heading>
                              <Heading mt="1"padding="3">{state.title}</Heading>
                              <Modal.Body>
                                <Text color="light.600">
                                  작성일 : {state.date}
                                </Text>
                                <Text> </Text>
                                <Text fontSize="md">{state.content}</Text>
                              </Modal.Body>
                            </Modal.Content>
                          </Modal>
                        </Box>
                      );
                    }}
                  </Pressable>
                </Box>
              ))}
            </>
          ) : null}
        </VStack>
      </ScrollView>
    </NativeBaseProvider>
  );
};

export default Notice;
