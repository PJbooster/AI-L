import {
  Box,
  Flex,
  Text,
  Button,
  Stack,
  Container,
  Heading,
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
  IconButton,
} from '@chakra-ui/react';
import { LuUser, LuSettings, LuLogOut, LuChevronDown } from 'react-icons/lu'; // Używamy Lucide Icons (standard w v3)
import Link from 'next/link';

export const Topbar = () => {
  return (
    <Box
      as="nav"
      background="white"
      _dark={{ background: 'gray.900', borderColor: 'gray.700' }}
      borderBottom="1px solid"
      borderColor="gray.200"
      py="3"
    >
      <Container maxW="container.xl">
        <Flex align="center" justify="space-between">
          {/* Logo Section */}
          <Link href="/" passHref>
            <Heading size="md" color="teal.500" fontWeight="bold" cursor="pointer">
              FinAnalyze AI
            </Heading>
          </Link>

          {/* Navigation & User Section */}
          <Stack direction="row" gap="8" align="center">
            <Stack direction="row" gap="6" display={{ base: 'none', md: 'flex' }}>
              <Link href="/" passHref>
                <Text fontSize="sm" fontWeight="medium" _hover={{ color: 'teal.500' }}>
                  Dashboard
                </Text>
              </Link>
              <Link href="/models" passHref>
                <Text fontSize="sm" fontWeight="medium" _hover={{ color: 'teal.500' }}>
                  Models
                </Text>
              </Link>
            </Stack>

            <MenuRoot>
              <MenuTrigger asChild>
                <Button variant="ghost" size="sm" gap="2" px="2">
                  <Box
                    bg="teal.500"
                    color="white"
                    borderRadius="full"
                    p="1"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                  >
                    <LuUser size="16" />
                  </Box>
                  <Text fontSize="sm" display={{ base: 'none', sm: 'block' }}>
                    Konto
                  </Text>
                  <LuChevronDown size="14" />
                </Button>
              </MenuTrigger>

              {/* Dodajemy portal i konkretne pozycjonowanie */}
              <MenuContent
                minW="150px"
                zIndex="popover"
                boxShadow="lg"
                borderRadius="md"
                bg="white"
                _dark={{ bg: 'gray.800' }}
              >
                <MenuItem value="settings" cursor="pointer" gap="2" px="3" py="2">
                  <LuSettings size="14" />
                  <Text fontSize="sm">Ustawienia</Text>
                </MenuItem>
                <MenuItem
                  value="logout"
                  color="red.500"
                  _hover={{ bg: 'red.50', color: 'red.600' }}
                  _dark={{ _hover: { bg: 'red.900/20' } }}
                  cursor="pointer"
                  gap="2"
                  px="3"
                  py="2"
                >
                  <LuLogOut size="14" />
                  <Text fontSize="sm">Wyloguj</Text>
                </MenuItem>
              </MenuContent>
            </MenuRoot>
          </Stack>
        </Flex>
      </Container>
    </Box>
  );
};
