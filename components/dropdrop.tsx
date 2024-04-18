'use client';

import Logout from "@/components/logout";
import { Button, Dropdown, DropdownItem, DropdownMenu, DropdownTrigger } from "@nextui-org/react";

export default function DropDrop() {

    return (
      <Dropdown>
        <DropdownTrigger>
          <Button
            variant="bordered"
          >
            마이페이지
          </Button>
        </DropdownTrigger>
        <DropdownMenu
          aria-label="Action event example"
          onAction={(key) => alert(key)}
        >
          <DropdownItem key="profile" href="/dashboard/profile">나의 정보</DropdownItem>
          <DropdownItem key="my review" href="/dashboard/profile/myreview" className="text-primary" color="primary">나의 리뷰</DropdownItem>
          <DropdownItem key="delete" className="text-danger" color="danger">
            <Logout />
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    );

}