/**
 * Footer Component
 *
 * Site footer with navigation, contact info, and social links.
 */

import {
  Box,
  Flex,
  Link,
  Stack,
  Text,
  SimpleGrid,
} from '@chakra-ui/react';

const FOOTER_LINKS = {
  services: [
    { label: 'Fractional CMO', href: '/services/fractional-cmo/' },
    { label: 'Marketing Strategy', href: '/services/marketing-strategy/' },
    { label: 'SEO for Law Firms', href: '/services/seo/' },
    { label: 'Intake Optimization', href: '/services/intake/' },
  ],
  resources: [
    { label: 'Guides', href: '/guide/' },
    { label: 'Blog', href: '/blog/' },
    { label: 'FAQ', href: '/faq/' },
  ],
  company: [
    { label: 'About', href: '/about/' },
    { label: 'Contact', href: '/contact/' },
    { label: 'Privacy Policy', href: '/privacy/' },
  ],
};

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <Box
      as="footer"
      bg="background.dark"
      color="text.white"
      py={{ base: 12, md: 16 }}
    >
      <Box maxW="1440px" mx="auto" px={{ base: 4, md: 6, lg: 8 }}>
        <SimpleGrid
          columns={{ base: 1, sm: 2, md: 4 }}
          gap={{ base: 8, md: 12 }}
          mb={12}
        >
          {/* Brand Column */}
          <Stack gap={4}>
            <Link
              href="/"
              fontSize="2xl"
              fontWeight="bold"
              color="brand.400"
              _hover={{ textDecoration: 'none', color: 'brand.300' }}
            >
              LEXGRO
            </Link>
            <Text fontSize="sm" color="text.light" maxW="250px">
              Empowering law firms to drive consistent revenue and growth without wasting time & money.
            </Text>
          </Stack>

          {/* Services */}
          <Stack gap={3}>
            <Text fontWeight="semibold" fontSize="sm" textTransform="uppercase" letterSpacing="wider">
              Services
            </Text>
            {FOOTER_LINKS.services.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                fontSize="sm"
                color="text.light"
                _hover={{ color: 'white', textDecoration: 'none' }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>

          {/* Resources */}
          <Stack gap={3}>
            <Text fontWeight="semibold" fontSize="sm" textTransform="uppercase" letterSpacing="wider">
              Resources
            </Text>
            {FOOTER_LINKS.resources.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                fontSize="sm"
                color="text.light"
                _hover={{ color: 'white', textDecoration: 'none' }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>

          {/* Company */}
          <Stack gap={3}>
            <Text fontWeight="semibold" fontSize="sm" textTransform="uppercase" letterSpacing="wider">
              Company
            </Text>
            {FOOTER_LINKS.company.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                fontSize="sm"
                color="text.light"
                _hover={{ color: 'white', textDecoration: 'none' }}
              >
                {link.label}
              </Link>
            ))}
          </Stack>
        </SimpleGrid>

        {/* Bottom Bar */}
        <Flex
          pt={8}
          borderTop="1px solid"
          borderColor="whiteAlpha.200"
          direction={{ base: 'column', md: 'row' }}
          justify="space-between"
          align="center"
          gap={4}
        >
          <Text fontSize="sm" color="text.light">
            © {currentYear} LEXGRO. All rights reserved.
          </Text>
          <Flex gap={6}>
            <Link
              href="/contact/"
              fontSize="sm"
              color="brand.400"
              fontWeight="medium"
              _hover={{ color: 'brand.300', textDecoration: 'none' }}
            >
              Schedule a Call
            </Link>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
}

export default Footer;
