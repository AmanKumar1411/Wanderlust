import React, { useState } from "react";
import GooglePlacesAutocomplete from "react-google-places-autocomplete";
import { Input } from "@/components/ui/input";
import {
  AI_PROMPT,
  SelectBudgetOptions,
  SelectTravelList,
} from "@/constants/options";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { sendMessageWithRetry } from "@/service/AIModal";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { doc, setDoc } from "firebase/firestore";
import { db } from "@/service/firebaseConfig";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { Sparkles } from "lucide-react";

const GOOGLE_MAPS_API_KEY =
  import.meta.env.VITE_GOOGLE_MAP_API_KEY ||
  import.meta.env.VITE_GOOGLE_PLACES_API_KEY;

function CreateTrip() {
  const [place, setPlace] = useState();
  const [formData, setFromData] = useState({});
  const [openDialog, setOpenDialog] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const menuPortalTarget =
    typeof document !== "undefined" ? document.body : null;

  const getAiErrorMessage = (error) => {
    const message = `${error?.message || ""}`.toLowerCase();

    if (
      message.includes("[429") ||
      message.includes("too many requests") ||
      message.includes("quota") ||
      message.includes("rate limit")
    ) {
      return "Gemini quota reached. Please wait and try again, or check API billing/quota settings.";
    }

    if (message.includes("[403") || message.includes("permission")) {
      return "Gemini API key is not allowed for this request. Check key restrictions and enabled APIs.";
    }

    if (message.includes("[404") || message.includes("model")) {
      return "Configured Gemini model is unavailable. Update VITE_GEMINI_MODEL in your env.";
    }

    return "Unable to generate trip right now. Please try again.";
  };

  const handleInputChange = (name, value) => {
    setFromData({
      ...formData,
      [name]: value,
    });
  };

  const completedFields = [
    formData?.location,
    formData?.totalDays,
    formData?.budget,
    formData?.traveler,
  ].filter(Boolean).length;

  const progressPercentage = (completedFields / 4) * 100;

  const login = useGoogleLogin({
    onSuccess: (codeResp) => GetUserProfile(codeResp),
    onError: (error) => console.log(error),
  });

  const OnGenerateTrip = async () => {
    const user = localStorage.getItem("user");
    if (!user) {
      setOpenDialog(true);
      return;
    }
    if (
      formData?.totalDays > 5 ||
      !formData?.location ||
      !formData?.budget ||
      !formData?.traveler
    ) {
      toast("Please fill all details!");
      return;
    }
    toast("Form generated.");
    setLoading(true);
    const FINAL_PROMPT = AI_PROMPT.replace("{location}", formData?.location)
      .replace("{totalDays}", formData?.totalDays)
      .replace("{traveler}", formData?.traveler)
      .replace("{budget}", formData?.budget);

    try {
      const result = await sendMessageWithRetry(FINAL_PROMPT, 1);
      SaveAiTrip(result?.response?.text());
    } catch (error) {
      console.error(error);
      toast(getAiErrorMessage(error));
      setLoading(false);
    }
  };

  const SaveAiTrip = async (TripData) => {
    setLoading(true);
    const user = JSON.parse(localStorage.getItem("user"));
    const docId = Date.now().toString();
    await setDoc(doc(db, "AiTrips", docId), {
      userSelection: formData,
      tripData: JSON.parse(TripData),
      userEmail: user?.email,
      id: docId,
    });
    setLoading(false);
    navigate("/view-trip/" + docId);
  };

  const GetUserProfile = async (tokenInfo) => {
    await axios
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
        OnGenerateTrip();
      });
  };

  return (
    <div className="mx-auto mt-8 w-full max-w-6xl px-4 pb-16 sm:px-8 lg:px-12">
      <div className="animate-fade-up rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
        <p className="inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs text-muted-foreground">
          <Sparkles className="h-3.5 w-3.5" />
          Create a smarter trip
        </p>
        <h2 className="mt-4 text-3xl font-black tracking-tight sm:text-4xl">
          Tell us your travel preferences
        </h2>
        <p className="mt-3 text-base text-muted-foreground sm:text-lg">
          Share a few details and Wanderlust will craft a personalized itinerary
          for your journey.
        </p>

        <div className="mt-6">
          <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
            <span>Trip setup progress</span>
            <span>{completedFields}/4 complete</span>
          </div>
          <div className="h-2 w-full rounded-full bg-secondary">
            <div
              className="h-2 rounded-full bg-primary transition-all duration-300"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
      </div>

      <div className="mt-8 space-y-6">
        <section className="animate-fade-up relative z-20 rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
          <label className="mb-3 block text-lg font-semibold sm:text-xl">
            1. What is your destination?
          </label>
          <GooglePlacesAutocomplete
            apiKey={GOOGLE_MAPS_API_KEY}
            selectProps={{
              placeholder: "Search city, country, or region",
              value: place,
              onChange: (v) => {
                setPlace(v);
                handleInputChange("location", v.label);
              },
              menuPortalTarget,
              menuPosition: "fixed",
              styles: {
                menuPortal: (base) => ({ ...base, zIndex: 9999 }),
              },
            }}
          />
        </section>

        <section className="animate-fade-up rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
          <label className="block text-lg font-semibold sm:text-xl">
            2. How many days are you planning your trip?
          </label>
          <Input
            className="mt-4 max-w-xs"
            placeholder={"ex. 3"}
            type="number"
            min="1"
            onChange={(v) => handleInputChange("totalDays", v.target.value)}
          />
        </section>

        <section className="animate-fade-up rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
          <label className="text-lg font-semibold sm:text-xl">
            3. What is your budget?
          </label>
          <p className="mt-2 text-sm text-muted-foreground sm:text-base">
            The budget is exclusively allocated for activities and dining
            purposes.
          </p>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {SelectBudgetOptions.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("budget", item.title)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md
                ${
                  formData?.budget === item.title
                    ? "border-primary bg-primary/5 shadow"
                    : ""
                }
                `}
              >
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="font-bold text-lg">{item.title}</h2>
                <h2 className="text-sm text-muted-foreground">{item.desc}</h2>
              </div>
            ))}
          </div>
        </section>

        <section className="animate-fade-up rounded-3xl border bg-card p-6 shadow-sm sm:p-8">
          <label className="text-lg font-semibold sm:text-xl">
            4. Who are you traveling with?
          </label>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {SelectTravelList.map((item, index) => (
              <div
                key={index}
                onClick={() => handleInputChange("traveler", item.people)}
                className={`cursor-pointer rounded-2xl border p-4 transition-all hover:-translate-y-0.5 hover:shadow-md
                  ${
                    formData?.traveler === item.people
                      ? "border-primary bg-primary/5 shadow"
                      : ""
                  }
                  `}
              >
                <h2 className="text-3xl">{item.icon}</h2>
                <h2 className="text-lg font-bold">{item.title}</h2>
                <h2 className="text-sm text-muted-foreground">{item.desc}</h2>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div className="mt-8 flex justify-end">
        <Button onClick={OnGenerateTrip} disabled={loading}>
          {loading ? (
            <AiOutlineLoading3Quarters className="h-7 w-7 animate-spin" />
          ) : (
            "Generate Trip"
          )}
        </Button>
      </div>

      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogContent>
          <DialogHeader>
            <img
              src="/favicon.png"
              alt="Wanderlust logo"
              className="h-20 w-20"
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
    </div>
  );
}

export default CreateTrip;
