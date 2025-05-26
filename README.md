# 🌤️ AI Weather Reporter

An intelligent weather automation system that collects user information, fetches real-time weather data, generates AI-powered insights, and delivers personalized weather reports via email.

## 📋 Project Overview

The AI Weather Reporter is a full-stack automation project that demonstrates modern web development and workflow automation techniques. Here's what it does:

### 🎯 Main Purpose
- **Collects user data** through a beautiful React form (name, email, city)
- **Fetches real-time weather** and air quality data from WeatherAPI.com
- **Generates AI commentary** using OpenRouter's Gemini Flash 1.5 model
- **Sends personalized emails** with beautiful HTML templates via Gmail
- **Tracks everything** in a Supabase database for analytics

### ✨ Key Features
- **Smart duplicate prevention** using unique record IDs
- **AI-powered insights** with intelligent fallback commentary
- **Professional email design** with responsive HTML templates
- **Real-time air quality data** with color-coded health indicators
- **Complete audit trail** of all submissions and email deliveries
- **Modern UI/UX** built with React, TypeScript, and shadcn/ui

### 🛠️ Technology Stack
- **Frontend**: React + TypeScript + Vite + shadcn/ui + Tailwind CSS
- **Automation**: n8n workflow platform
- **Database**: Supabase (PostgreSQL)
- **Weather API**: WeatherAPI.com
- **AI**: OpenRouter (Gemini Flash 1.5)
- **Email**: Gmail OAuth2
- **Hosting**: Lovable.dev platform

---

## 🚀 N8N Setup Instructions

### Prerequisites
- n8n instance (cloud or self-hosted)
- Basic understanding of n8n workflows

### Step 1: Import the Workflow
1. **Download** the workflow file: `ai-weather-reporter-workflow-updated.json`
2. **Open your n8n instance** in a web browser
3. **Click "Import"** in the top menu
4. **Select the JSON file** and import it
5. **Review the workflow** - you'll see sticky notes with setup instructions

### Step 2: Get Required API Keys

#### WeatherAPI.com Setup
1. **Sign up** at [WeatherAPI.com](https://www.weatherapi.com/signup.aspx)
2. **Get your API key** from the dashboard (free tier: 1M calls/month)
3. **Copy the key** - you'll need it for environment variables

#### OpenRouter AI Setup
1. **Sign up** at [OpenRouter.ai](https://openrouter.ai/)
2. **Get your API key** from the dashboard
3. **Copy the key** - you'll need it for environment variables

#### Gmail OAuth2 Setup
1. **Enable Gmail API** in Google Cloud Console
2. **Create OAuth2 credentials** (Client ID + Secret)
3. **Add redirect URI**: `http://localhost:5678/rest/oauth2-credential/callback`
4. **Required scope**: `https://www.googleapis.com/auth/gmail.send`

### Step 3: Configure Environment Variables
In your n8n instance, set these environment variables:
```bash
WEATHER_API_KEY=your_weatherapi_key_here
OPENROUTER_API_KEY=your_openrouter_key_here
```

### Step 4: Configure Credentials
1. **Gmail OAuth2**: Set up in n8n credential manager with your OAuth2 details
2. **Supabase**: Configure native Supabase node credentials (see Supabase setup below)

### Step 5: Update Webhook URL
1. **Find the Webhook node** in the workflow
2. **Copy the webhook URL** (it will look like: `https://your-n8n-instance.com/webhook/weather-report`)
3. **Update the frontend** with this URL (see Frontend setup below)

### Step 6: Test the Workflow
1. **Activate the workflow** in n8n
2. **Test with sample data** using the webhook URL
3. **Check all nodes execute** successfully
4. **Verify email delivery** and database storage

---

## 💻 Frontend Setup Instructions

### Prerequisites
- **Node.js** (version 18 or higher) - [Download here](https://nodejs.org/)
- **npm** (comes with Node.js)
- **Git** (for cloning the repository)

### Step 1: Clone and Install
```bash
# Clone the repository
git clone <your-repository-url>

# Navigate to the project directory
cd ai-automation-internship

# Install dependencies
npm install
```

### Step 2: Update Webhook URL
1. **Open** `src/components/WeatherForm.tsx`
2. **Find line 63** with the webhook URL
3. **Replace** the URL with your n8n webhook URL:
```typescript
const webhookUrl = "https://your-n8n-instance.com/webhook/weather-report";
```

### Step 3: Start Development Server
```bash
# Start the development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Step 4: Build for Production (Optional)
```bash
# Build for production
npm run build

# Preview the production build
npm run preview
```

### Available Scripts
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

---

## 🗄️ Supabase Database Setup

### Step 1: Create Supabase Project
1. **Sign up** at [Supabase.com](https://supabase.com)
2. **Create a new project**
3. **Wait for setup** to complete (usually 2-3 minutes)
4. **Note your project URL** and **anon key** from Settings > API

### Step 2: Run Database Setup
1. **Open** the Supabase SQL Editor in your project dashboard
2. **Copy** the contents of `supabase-setup.sql` from this repository
3. **Paste** the SQL commands into the editor
4. **Run** the commands to create the database schema

The SQL will create:
- `weather_reports` table with all required columns
- Proper indexes for performance
- Analytics view for reporting
- Sample data verification queries

### Step 3: Configure n8n Supabase Connection
1. **In n8n**, go to Credentials
2. **Add new credential** → Supabase
3. **Enter your details**:
   - **Host**: Your Supabase project URL
   - **API Key**: Your Supabase anon key (from Settings > API)
4. **Test the connection** to ensure it works

### Step 4: Verify Setup
1. **Check the table** was created in Supabase Table Editor
2. **Run a test** workflow execution
3. **Verify data** appears in the `weather_reports` table
4. **Check the analytics view** for reporting capabilities

### Database Schema
The `weather_reports` table includes:
- `id` - Unique identifier (UUID)
- `name` - User's full name
- `email` - User's email address
- `city` - Requested city
- `temperature` - Current temperature (°C)
- `condition` - Weather condition description
- `aqi` - Air Quality Index (PM2.5)
- `ai_commentary` - AI-generated weather insights
- `email_valid` - Email validation status
- `weather_fetch_success` - Weather API success status
- `email_sent` - Email delivery tracking
- `timestamp` - Record creation time

---

## 🔧 Configuration Notes

### Environment Variables
Make sure these are set in your n8n instance:
```bash
WEATHER_API_KEY=your_weatherapi_key
OPENROUTER_API_KEY=your_openrouter_key
```

### Security Considerations
- Never commit API keys to version control
- Use environment variables for all sensitive data
- Rotate API keys regularly
- Monitor usage to prevent quota overages
- Enable rate limiting if needed

### Troubleshooting
- **Webhook not responding**: Check n8n workflow is active
- **Email not sending**: Verify Gmail OAuth2 setup and scopes
- **Database errors**: Ensure Supabase credentials are correct
- **Weather API errors**: Check API key and quota limits
- **AI commentary failing**: Verify OpenRouter API key and model availability

---

## 📊 Features and Workflow

### Complete Automation Flow
1. **User submits form** → Frontend validation
2. **Data sent to n8n** → Server-side email validation
3. **Weather data fetched** → WeatherAPI.com integration
4. **Initial data stored** → Supabase database logging
5. **AI commentary generated** → OpenRouter/Gemini processing
6. **Commentary stored** → Database update
7. **Email sent** → Gmail OAuth2 delivery
8. **Status updated** → Email delivery tracking
9. **Response sent** → User confirmation

### Smart Features
- **Duplicate prevention** using unique record IDs
- **Fallback AI commentary** based on temperature ranges
- **Beautiful email templates** with responsive design
- **Air quality color coding** (Good/Moderate/Unhealthy)
- **Complete audit trail** for all submissions
- **Error handling** at every step

---

## 🎯 Project Goals

This project was built as a qualifying task for an **AI Automation Internship** and demonstrates:

- **Modern web development** with React and TypeScript
- **Workflow automation** using n8n
- **API integrations** with multiple services
- **Database design** and management
- **Email automation** with professional templates
- **AI integration** for enhanced user experience
- **Error handling** and fault tolerance
- **Security best practices** with OAuth2

---

## 🤝 Support

For questions or issues:
- Check the n8n workflow sticky notes for detailed setup instructions
- Review API service documentation for troubleshooting
- Test individual workflow nodes to isolate problems
- Monitor n8n execution history for error details

Built with ❤️ for the AI Automation Internship program.
