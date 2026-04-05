import React, { useState } from "react";
import { Button } from "../ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { googleLogout, useGoogleLogin } from "@react-oauth/google";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import { Link } from "react-router-dom";
import ThemeToggle from "./ThemeToggle";

function Header() {
  const user = JSON.parse(localStorage.getItem("user"));
  const [openDialog, setOpenDialog] = useState(false);

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const GetUserProfile = (tokenInfo) => {
    axios
      .get(
        `https://www.googleapis.com/oauth2/v1/userinfo?acess_token=${tokenInfo?.access_token}`,
        {
          headers: {
            Authorization: `Bearer ${tokenInfo?.access_token}`,
            Accept: "Application/json",
          },
        },
      )
      .then((resp) => {
        console.log(resp);
        localStorage.setItem("user", JSON.stringify(resp.data));
        setOpenDialog(false);
        window.location.reload();
      });
  };

  return (
    <header className="sticky top-0 z-40 border-b bg-background/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-7xl items-center justify-between p-3 px-4">
        <Link to="/" className="transition-opacity hover:opacity-90">
          <img
            src="/favicon.png"
            alt="Wanderlust logo"
            className="h-14 w-14 object-contain"
          />
        </Link>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          {user ? (
            <div className="flex items-center gap-4">
              <Link to="/create-trip">
                <Button variant="outline" className="rounded-full">
                  Create Trip
                </Button>
              </Link>
              <Link to="/my-trips">
                <Button variant="outline" className="rounded-full">
                  My Trips{" "}
                </Button>
              </Link>
              <Popover>
                <PopoverTrigger>
                  <img
                    src={user?.picture}
                    className="h-[38px] w-[38px] rounded-full"
                    alt="User profile"
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <h2
                    className="cursor-pointer"
                    onClick={() => {
                      googleLogout();
                      localStorage.clear();
                      window.location.reload();
                    }}
                  >
                    Logout
                  </h2>
                </PopoverContent>
              </Popover>
            </div>
          ) : (
            <Button onClick={() => setOpenDialog(true)}>Sign In</Button>
          )}
        </div>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <img
              src="/favicon.png"
              alt="Wanderlust logo"
              className="h-14 w-14 object-contain"
            />
            <DialogTitle className="mt-6">Sign In with Google</DialogTitle>
            <DialogDescription>
              Sign In to the App with Google authentication securely.
            </DialogDescription>
          </DialogHeader>
          <Button
            onClick={login}
            className="w-full mt-2 flex gap-4 items-center"
          >
            <FcGoogle className="h-7 w-7" />
            Sign In With Google
          </Button>
        </DialogContent>
      </Dialog>
    </header>
  );
}

export default Header;
