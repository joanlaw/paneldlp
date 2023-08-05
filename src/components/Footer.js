import React from 'react'
import { Typography } from "antd";

function Footer() {
  return (
    <div className="AppFooter">
    <Typography.Link href="https://duellinks.pro">Duel Links Pro</Typography.Link>
    <Typography.Link href="https://duellinks.pro" target={"_blank"}>
      Privacy Policy
    </Typography.Link>
    <Typography.Link href="https://duellinks.pro  " target={"_blank"}>
      Terms of Use
    </Typography.Link>
  </div>
  )
}

export default Footer