import React, { FC, ChangeEvent, useEffect, useState } from "react";
import { Grid, Center, Select, Text, Button, Stack } from "@chakra-ui/react";
import {
  Pagination,
  usePagination,
  PaginationPage,
  PaginationNext,
  PaginationPrevious,
  PaginationPageGroup,
  PaginationContainer,
  PaginationSeparator,
} from "@ajna/pagination";
import { collection, getFirestore, limit, onSnapshot, orderBy, query, startAt, where } from "firebase/firestore";
import { format } from "date-fns";
import { app } from "../../src/firebase";
import { useAuth } from "../../src/atom";

const users = [
  {
    id: 1,
    name: "Carlin Gwinn",
    email: "cgwinn0@buzzfeed.com",
    phone: "(684) 9842794",
    birthday: "04/11/2009",
    avatar_url:
      "https://robohash.org/assumendanihilodio.png?size=50x50&set=set1"
  },
  {
    id: 2,
    name: "Yetta Snape",
    email: "ysnape1@princeton.edu",
    phone: "(645) 8617506",
    birthday: "06/08/1989",
    avatar_url:
      "https://robohash.org/liberorationequasi.png?size=50x50&set=set1"
  },
  {
    id: 1,
    name: "Carlin Gwinn",
    email: "cgwinn0@buzzfeed.com",
    phone: "(684) 9842794",
    birthday: "04/11/2009",
    avatar_url:
      "https://robohash.org/assumendanihilodio.png?size=50x50&set=set1"
  },
  {
    id: 2,
    name: "Yetta Snape",
    email: "ysnape1@princeton.edu",
    phone: "(645) 8617506",
    birthday: "06/08/1989",
    avatar_url:
      "https://robohash.org/liberorationequasi.png?size=50x50&set=set1"
  },
  {
    id: 1,
    name: "Carlin Gwinn",
    email: "cgwinn0@buzzfeed.com",
    phone: "(684) 9842794",
    birthday: "04/11/2009",
    avatar_url:
      "https://robohash.org/assumendanihilodio.png?size=50x50&set=set1"
  },
  {
    id: 2,
    name: "Yetta Snape",
    email: "ysnape1@princeton.edu",
    phone: "(645) 8617506",
    birthday: "06/08/1989",
    avatar_url:
      "https://robohash.org/liberorationequasi.png?size=50x50&set=set1"
  },
  {
    id: 1,
    name: "Carlin Gwinn",
    email: "cgwinn0@buzzfeed.com",
    phone: "(684) 9842794",
    birthday: "04/11/2009",
    avatar_url:
      "https://robohash.org/assumendanihilodio.png?size=50x50&set=set1"
  },
  {
    id: 2,
    name: "Yetta Snape",
    email: "ysnape1@princeton.edu",
    phone: "(645) 8617506",
    birthday: "06/08/1989",
    avatar_url:
      "https://robohash.org/liberorationequasi.png?size=50x50&set=set1"
  }
];

const fetchPokemons = async (
  pageSize: number,
  offset: number
): Promise<any> => {
  // //データのステート
  // const nowtoday = new Date();
  // const nowYear = format(nowtoday, 'yyyy年M月');

  // const [year, setYear] = useState(nowYear.toString());
  // const [details, setDetails] = useState<any>([]);
  // //Recoilのログイン状態
  // const user = useAuth();
  // // //データベース接続
  // const db = getFirestore(app);

  // return await fetch(
  //   `https://pokeapi.co/api/v2/pokemon?limit=${pageSize}&offset=${offset}`
  // ).then(async (res) => await res.json());

  return users
  // if (user) {
  //   //ユーザーデータ読み込み
  //   const usersCollectionRef = await collection(db, 'users', user.uid, 'details');
  //   //今月の内容全て読み込み
  //   const qSum = query(usersCollectionRef,
  //     where('yearAndMonth', '==', year.toString()),
  //     orderBy('date', 'desc'),
  //     limit(pageSize),
  //     startAt(offset)
  //   );
  //   await onSnapshot(
  //     qSum, (snapshot) => setDetails(snapshot.docs.map((doc) => (
  //       { ...doc.data(), id: doc.id }
  //     ))), //取得時にidをdoc.idにする
  //     (error) => {
  //       console.log(error.message);
  //       console.log('err');
  //     },
  //   );
  // }
};

// console.log(fetchPokemons(10, 20))
const Full: FC = () => {
  // states
  const [pokemonsTotal, setPokemonsTotal] = useState<number | undefined>(
    undefined
  );
  const [pokemons, setPokemons] = useState<any[]>([]);

  // constants
  const outerLimit = 2;
  const innerLimit = 2;

  // pagination hook
  const {
    pages,
    pagesCount,
    offset,
    currentPage,
    setCurrentPage,
    setIsDisabled,
    isDisabled,
    pageSize,
    setPageSize,
  } = usePagination({
    total: pokemonsTotal,
    limits: {
      outer: outerLimit,
      inner: innerLimit,
    },
    initialState: {
      pageSize: 2,
      isDisabled: false,
      currentPage: 1,
    },
  });

  // effects
  useEffect(() => {
    fetchPokemons(pageSize, offset)
      .then((pokemons) => {
        setPokemonsTotal(pokemons.length);
        setPokemons(pokemons);
      })
      .catch((error) => console.error("App =>", error));
    console.log(pokemons)
  }, [currentPage, pageSize, offset]);

  // handlers
  const handlePageChange = (nextPage: number): void => {
    // -> request new data using the page number
    setCurrentPage(nextPage);
    console.log("request new data with ->", nextPage);
  };

  const handlePageSizeChange = (
    event: ChangeEvent<HTMLSelectElement>
  ): void => {
    const pageSize = Number(event.target.value);

    setPageSize(pageSize);
  };

  const handleDisableClick = (): void => {
    setIsDisabled((oldState) => !oldState);
  };

  return (
    <Stack>
      <Pagination
        pagesCount={pagesCount}
        currentPage={currentPage}
        isDisabled={isDisabled}
        onPageChange={handlePageChange}
      >
        <PaginationContainer
          align="center"
          justify="space-between"
          p={4}
          w="full"
        >
          <PaginationPrevious
            _hover={{
              bg: "yellow.400",
            }}
            bg="yellow.300"
            isDisabled
            onClick={() => console.warn("I'm clicking the previous")}
          >
            <Text>Previous</Text>
          </PaginationPrevious>
          <PaginationPageGroup
            isInline
            align="center"
            separator={
              <PaginationSeparator
                isDisabled
                onClick={() => console.warn("I'm clicking the separator")}
                bg="blue.300"
                fontSize="sm"
                w={7}
                jumpSize={11}
              />
            }
          >
            {pages.map((page: number) => (
              <PaginationPage
                w={7}
                bg="red.300"
                key={`pagination_page_${page}`}
                page={page}
                onClick={() => console.warn("Im clicking the page")}
                fontSize="sm"
                _hover={{
                  bg: "green.300",
                }}
                _current={{
                  bg: "green.300",
                  fontSize: "sm",
                  w: 7,
                }}
              />
            ))}
          </PaginationPageGroup>
          <PaginationNext
            _hover={{
              bg: "yellow.400",
            }}
            bg="yellow.300"
            onClick={() => console.warn("I'm clicking the next")}
          >
            <Text>Next</Text>
          </PaginationNext>
        </PaginationContainer>
      </Pagination>
      <Center w="full">
        <Button
          _hover={{
            bg: "purple.400",
          }}
          bg="purple.300"
          onClick={handleDisableClick}
        >
          Disable ON / OFF
        </Button>
        <Select ml={3} onChange={handlePageSizeChange} w={40}>
          <option value="10">10</option>
          <option value="25">25</option>
          <option value="50">50</option>
        </Select>
      </Center>
      <Grid
        gap={3}
        mt={20}
        px={20}
        templateColumns="repeat(5, 1fr)"
        templateRows="repeat(2, 1fr)"
      >
        {pokemons?.map(({ name }) => (
          <Center key={name} bg="green.100" p={4}>
            <Text>{name}</Text>
          </Center>
        ))}
      </Grid>
    </Stack>
  );
};

export default Full;