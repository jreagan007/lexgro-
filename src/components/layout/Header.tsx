/**
 * Header Component
 *
 * Main navigation header for the site.
 * Includes logo, navigation links, and CTA button.
 */

import {
  Box,
  Flex,
  Link,
  Button,
  IconButton,
  Stack,
  Collapsible,
  useDisclosure,
} from '@chakra-ui/react';
import { HiMenu, HiX } from 'react-icons/hi';

// Navigation links configuration
const NAV_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'Services', href: '/services/' },
  { label: 'Guides', href: '/guide/' },
  { label: 'Blog', href: '/blog/' },
  { label: 'About', href: '/about/' },
  { label: 'Contact', href: '/contact/' },
];

export function Header() {
  const { open, onToggle } = useDisclosure();

  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={100}
      bg="white"
      borderBottom="1px solid"
      borderColor="border.default"
      backdropFilter="blur(8px)"
      backgroundColor="rgba(255, 255, 255, 0.95)"
    >
      <Flex
        maxW="1440px"
        mx="auto"
        px={{ base: 4, md: 6, lg: 8 }}
        py={4}
        align="center"
        justify="space-between"
      >
        {/* Logo */}
        <Link
          href="/"
          display="flex"
          alignItems="center"
          fontWeight="bold"
          fontSize="xl"
          color="brand.500"
          _hover={{ textDecoration: 'none' }}
        >
          LEXGRO
        </Link>

        {/* Desktop Navigation */}
        <Flex
          display={{ base: 'none', md: 'flex' }}
          align="center"
          gap={8}
        >
          <Stack
            direction="row"
            gap={6}
          >
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                fontSize="sm"
                fontWeight="medium"
                color="text.primary"
                _hover={{
                  color: 'brand.500',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>

          <Button
            as="a"
            href="/contact/"
            size="sm"
            bg="brand.500"
            color="white"
            _hover={{ bg: 'brand.600' }}
          >
            Free Audit
          </Button>
        </Flex>

        {/* Mobile Menu Button */}
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          onClick={onToggle}
          variant="ghost"
          aria-label="Toggle navigation"
        >
          {open ? <HiX size={24} /> : <HiMenu size={24} />}
        </IconButton>
      </Flex>

      {/* Mobile Navigation */}
      <Collapsible.Root open={open}>
        <Collapsible.Content>
          <Box
            display={{ base: 'block', md: 'none' }}
            pb={4}
            px={4}
            bg="white"
            borderBottom="1px solid"
            borderColor="border.default"
          >
            <Stack gap={4}>
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  py={2}
                  fontWeight="medium"
                  color="text.primary"
                  _hover={{ color: 'brand.500' }}
                >
                  {link.label}
                </Link>
              ))}
              <Button
                as="a"
                href="/contact/"
                w="full"
                bg="brand.500"
                color="white"
                _hover={{ bg: 'brand.600' }}
              >
                Get a Free Marketing Audit
              </Button>
            </Stack>
          </Box>
        </Collapsible.Content>
      </Collapsible.Root>
    </Box>
  );
}

export default Header;
