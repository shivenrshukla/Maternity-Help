import Link from "next/link"

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-links">
          <Link href="/about">About Us</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms of Service</Link>
          <Link href="/contact">Contact</Link>
          <Link href="/help">Help Center</Link>
        </div>
        <p>&copy; 2024 NurtureWell. All rights reserved. Empowering mothers and families.</p>
      </div>
    </footer>
  )
}
