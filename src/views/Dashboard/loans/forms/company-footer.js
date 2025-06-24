import { MapPin, Phone, Mail, Globe } from "lucide-react"

export default function CompanyFooter() {
  return (
    <div className="mt-8 pt-8 border-t border-gray-200">
      <div className="flex flex-col items-center text-center">
        <h3 className="text-lg font-semibold text-gray-900">Spar Capital</h3>
        <p className="mt-1 text-sm text-gray-600">Leading you to a Better Future</p>

        <div className="mt-4 flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-600">
          <div className="flex items-center">
            <MapPin className="h-4 w-4 mr-1" />
            <span>Nairobi, Kenya</span>
          </div>
          <div className="flex items-center">
            <Globe className="h-4 w-4 mr-1" />
            <a href="http://www.sparcapital.co.ke" className="hover:text-green-600">
              www.sparcapital.co.ke
            </a>
          </div>
          <div className="flex items-center">
            <Phone className="h-4 w-4 mr-1" />
            <a href="tel:+254718126940" className="hover:text-green-600">
              +254 718 126 940
            </a>
          </div>
          <div className="flex items-center">
            <Mail className="h-4 w-4 mr-1" />
            <a href="mailto:sparcapitalltd@gmail.com" className="hover:text-green-600">
              sparcapitalltd@gmail.com
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
