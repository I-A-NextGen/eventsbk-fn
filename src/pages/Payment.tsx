import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { PaymentInfo } from "../utils/type";
import { toast } from "sonner";
import { Label } from "../components/ui/label";
import { Input } from "../components/ui/input";
import { ArrowLeft, CreditCard, Lock, Smartphone } from "lucide-react";
import { Button } from "../components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../components/ui/card";
import { RadioGroup, RadioGroupItem } from "../components/ui/radio-group";
import { formatCurrency } from "../utils/helper";
import { Separator } from "../components/ui/separator";

interface CartItem {
  eventId: string;
  quantity: number;
  eventTitle: string;
  eventDate: string;
  price: number;
  totalPrice: number;
}

interface PaymentProps {
  items: CartItem[];
  totalAmount: number;
}

const Payment: React.FC<PaymentProps> = () => {
  const location = useLocation();
  const navigate = useNavigate();

  
  const items: CartItem[] = location.state?.items || [];
  const totalAmount: number = location.state?.totalAmount || 0;

  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({
    paymentMethod: "card",
    cardNumber: "",
    cardHolder: "",
    expiryDate: "",
    cvv: "",
    phoneNumber: "",
  });
  const [errors, setErrors] = useState<
    Partial<PaymentInfo & { phoneNumber: string }>
  >({});
  const [isProcessing, setIsProcessing] = useState(false);

  
  if (items.length === 0) {
    navigate("/");
    return null;
  }

  const handlePaymentMethodChange = (method: string) => {
    console.log("Selected payment method:", method);
    setPaymentInfo({
      paymentMethod: method,
      cardNumber: "",
      cardHolder: "",
      expiryDate: "",
      cvv: "",
      phoneNumber: "",
    });
    setErrors({});
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    
    if (paymentInfo.paymentMethod === "card") {
      let formattedValue = value;

      
      if (name === "cardNumber") {
        formattedValue = value
          .replace(/\s/g, "") 
          .replace(/\D/g, "") 
          .slice(0, 16); 

        
        if (formattedValue.length > 0) {
          formattedValue =
            formattedValue.match(/.{1,4}/g)?.join(" ") || formattedValue;
        }
      }

      
      if (name === "expiryDate") {
        formattedValue = value
          .replace(/\D/g, "") 
          .slice(0, 4); 

        if (formattedValue.length > 2) {
          formattedValue =
            formattedValue.slice(0, 2) + "/" + formattedValue.slice(2);
        }
      }

      
      if (name === "cvv") {
        formattedValue = value
          .replace(/\D/g, "") 
          .slice(0, 4); 
      }

      setPaymentInfo((prev) => ({
        ...prev,
        [name]: formattedValue,
      }));
    } else if (name === "phoneNumber") {
      
      const formattedValue = value
        .replace(/\D/g, "") 
        .slice(0, 10); 

      setPaymentInfo((prev) => ({
        ...prev,
        phoneNumber: formattedValue,
      }));
    } else {
      
      setPaymentInfo((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: Partial<PaymentInfo & { phoneNumber: string }> = {};

    if (paymentInfo.paymentMethod === "card") {
      
      if (
        !paymentInfo.cardNumber ||
        paymentInfo.cardNumber.replace(/\s/g, "").length < 16
      ) {
        newErrors.cardNumber = "Valid card number is required";
      }

      if (!paymentInfo.cardHolder) {
        newErrors.cardHolder = "Cardholder name is required";
      }

      if (!paymentInfo.expiryDate || !paymentInfo.expiryDate.includes("/")) {
        newErrors.expiryDate = "Valid expiry date is required (MM/YY)";
      }

      if (!paymentInfo.cvv || paymentInfo.cvv.length < 3) {
        newErrors.cvv = "Valid CVV is required";
      }
    } else {
      
      if (!paymentInfo.phoneNumber || paymentInfo.phoneNumber.length < 10) {
        newErrors.phoneNumber = "Valid phone number is required";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsProcessing(true);

    
    const paymentMethodName =
      paymentInfo.paymentMethod === "card"
        ? "Card"
        : paymentInfo.paymentMethod === "mtn"
        ? "MTN Mobile Money"
        : "Tigo Cash";

    toast.success(`Processing ${paymentMethodName} payment...`);

    
    setTimeout(() => {
      setIsProcessing(false);

      
      let paymentMethodText = "Unknown payment method";
      if (paymentInfo.paymentMethod === "card") {
        paymentMethodText = `Card ending in ${paymentInfo.cardNumber?.slice(
          -4
        )}`;
      } else if (paymentInfo.paymentMethod === "mtn") {
        paymentMethodText = `MTN Mobile Money (${paymentInfo.phoneNumber})`;
      } else if (paymentInfo.paymentMethod === "tigo") {
        paymentMethodText = `Tigo Cash (${paymentInfo.phoneNumber})`;
      }

      
      const receiptData = {
        orderNumber: Math.random().toString(36).substring(2, 10).toUpperCase(),
        items,
        totalAmount,
        paymentMethod: paymentMethodText,
        purchaseDate: new Date().toISOString(),
      };

      navigate("/receipt", { state: { receipt: receiptData } });
    }, 1500);
  };

  
  const renderPaymentForm = () => {
    switch (paymentInfo.paymentMethod) {
      case "card":
        return (
          <div className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="cardNumber">Card Number</Label>
              <div className="relative">
                <Input
                  id="cardNumber"
                  name="cardNumber"
                  placeholder="1234 5678 9012 3456"
                  value={paymentInfo.cardNumber}
                  onChange={handleInputChange}
                  className={errors.cardNumber ? "border-destructive" : ""}
                />
                <CreditCard className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              {errors.cardNumber && (
                <p className="text-sm text-destructive">{errors.cardNumber}</p>
              )}
            </div>

            <div className="space-y-1">
              <Label htmlFor="cardHolder">Cardholder Name</Label>
              <Input
                id="cardHolder"
                name="cardHolder"
                placeholder="your name"
                autoComplete="cc-name"
                value={paymentInfo.cardHolder}
                onChange={handleInputChange}
                className={errors.cardHolder ? "border-destructive" : ""}
              />
              {errors.cardHolder && (
                <p className="text-sm text-destructive">{errors.cardHolder}</p>
              )}
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-1">
                <Label htmlFor="expiryDate">Expiry Date</Label>
                <Input
                  id="expiryDate"
                  name="expiryDate"
                  placeholder="MM/YY"
                  value={paymentInfo.expiryDate}
                  onChange={handleInputChange}
                  className={errors.expiryDate ? "border-destructive" : ""}
                />
                {errors.expiryDate && (
                  <p className="text-sm text-destructive">
                    {errors.expiryDate}
                  </p>
                )}
              </div>

              <div className="space-y-1">
                <Label htmlFor="cvv">CVV</Label>
                <Input
                  id="cvv"
                  name="cvv"
                  placeholder="123"
                  value={paymentInfo.cvv}
                  onChange={handleInputChange}
                  className={errors.cvv ? "border-destructive" : ""}
                />
                {errors.cvv && (
                  <p className="text-sm text-destructive">{errors.cvv}</p>
                )}
              </div>
            </div>
          </div>
        );

      case "mtn":
      case "tigo":
        const provider =
          paymentInfo.paymentMethod === "mtn"
            ? "MTN Mobile Money"
            : "Tigo Cash";
        return (
          <div className="space-y-6">
            <div className="space-y-1">
              <Label htmlFor="phoneNumber">{provider} Phone Number</Label>
              <div className="relative">
                <Input
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="07XXXXXXXX"
                  value={paymentInfo.phoneNumber}
                  onChange={handleInputChange}
                  className={errors.phoneNumber ? "border-destructive" : ""}
                />
                <Smartphone className="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              </div>
              {errors.phoneNumber && (
                <p className="text-sm text-destructive">{errors.phoneNumber}</p>
              )}
            </div>

            <div className="rounded-md bg-amber-50 p-4 border border-amber-200">
              <p className="text-sm text-amber-800">
                You will receive a prompt on your phone to complete the{" "}
                {provider} payment.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 pt-24 pb-12">
        <Button variant="ghost" onClick={() => navigate(-1)} className="mb-6">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back
        </Button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Payment Details</CardTitle>
                <CardDescription>
                  Select your preferred payment method to complete your purchase
                </CardDescription>
              </CardHeader>

              <form onSubmit={handleSubmit}>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    <Label>Payment Method</Label>
                    <RadioGroup
                      value={paymentInfo.paymentMethod}
                      onValueChange={handlePaymentMethodChange}
                      className="grid grid-cols-3 gap-4"
                    >
                      <div
                        className={`flex flex-col items-center justify-between rounded-md border-2 p-4 ${
                          paymentInfo.paymentMethod === "card"
                            ? "border-primary"
                            : "border-border"
                        }`}
                      >
                        <RadioGroupItem
                          value="card"
                          id="card"
                          className="sr-only"
                        />
                        <label
                          htmlFor="card"
                          className="flex flex-col items-center cursor-pointer"
                        >
                          <CreditCard className="mb-3 h-6 w-6" />
                          <span className="text-sm font-normal">
                            Credit Card
                          </span>
                        </label>
                      </div>

                      <div
                        className={`flex flex-col items-center justify-between rounded-md border-2 p-4 ${
                          paymentInfo.paymentMethod === "mtn"
                            ? "border-primary"
                            : "border-border"
                        }`}
                      >
                        <RadioGroupItem
                          value="mtn"
                          id="mtn"
                          className="sr-only"
                        />
                        <label
                          htmlFor="mtn"
                          className="flex flex-col relative items-center cursor-pointer"
                        >
                          <div className="w-20 h-12 relative">
                            <img
                              src="https://www.electronicpaymentsinternational.com/wp-content/uploads/sites/4/2021/11/MTN_Mobile_Money.jpg"
                              alt=""
                              className="size-full object-contain"
                            />
                          </div>
                          <span className="text-sm font-normal">MTN Money</span>
                        </label>
                      </div>

                      <div
                        className={`flex flex-col items-center justify-between rounded-md border-2 p-4 ${
                          paymentInfo.paymentMethod === "tigo"
                            ? "border-primary"
                            : "border-border"
                        }`}
                      >
                        <RadioGroupItem
                          value="tigo"
                          id="tigo"
                          className="sr-only"
                        />
                        <label
                          htmlFor="tigo"
                          className="flex flex-col items-center cursor-pointer"
                        >
                          <div className="w-20 h-12 relative">
                            <img
                              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSRNXYNtHibf1CpPqWdJsL-QNO252FzAAMeDg&s"
                              alt=""
                              className="size-full object-contain"
                            />
                          </div>
                          <span className="text-sm font-normal">Tigo Cash</span>
                        </label>
                      </div>
                    </RadioGroup>
                  </div>

                  <Separator />

                  {renderPaymentForm()}

                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Lock className="h-4 w-4" />
                    <span>
                      Your payment information is encrypted and secure.
                    </span>
                  </div>
                </CardContent>

                <CardFooter>
                  <Button
                    type="submit"
                    className="w-full mt-32"
                    disabled={isProcessing}
                  >
                    {isProcessing
                      ? "Processing..."
                      : `Pay ${formatCurrency(totalAmount)}`}
                  </Button>
                </CardFooter>
              </form>
            </Card>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>

              <CardContent className="space-y-4">
                {items.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between mb-1">
                      <span className="font-medium">{item.eventTitle}</span>
                      <span>{formatCurrency(item.totalPrice)}</span>
                    </div>
                    <div className="text-sm text-muted-foreground flex justify-between">
                      <span>
                        {item.quantity} ticket{item.quantity > 1 ? "s" : ""}
                      </span>
                      <span>{formatCurrency(item.price)} each</span>
                    </div>
                    {index < items.length - 1 && <Separator className="my-4" />}
                  </div>
                ))}

                <Separator className="my-4" />

                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>{formatCurrency(totalAmount)}</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;
