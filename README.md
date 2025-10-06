# 🚀 Space Biology Knowledge Engine

**NASA Space Apps Challenge 2025 Submission**

An innovative AI-powered platform that transforms 607 NASA space biology publications into an interactive, searchable knowledge base. Built to make decades of space research accessible to scientists, mission planners, and space enthusiasts.

![Space Biology Knowledge Engine](https://img.shields.io/badge/NASA-Space%20Apps%202025-blue?style=for-the-badge)
![React](https://img.shields.io/badge/React-18.0-61dafb?style=for-the-badge&logo=react)
![AI Powered](https://img.shields.io/badge/AI-Powered%20Search-purple?style=for-the-badge)

## 🌟 Features

### 📊 Data Integration
- **607 NASA Publications**: Automatically processes and categorizes research from PubMed Central
- **Smart Categorization**: AI identifies organisms, research topics, and categories from publication titles
- **Direct Links**: Each publication links to its original PubMed Central source

### 🤖 AI-Powered Search
- **Semantic Understanding**: Natural language queries like "how does space affect human bones?"
- **Fuzzy Matching**: Handles typos and partial matches
- **Relevance Ranking**: AI scores and ranks results by relevance
- **Query Expansion**: Automatically includes related terms and synonyms
- **Real-time Suggestions**: Dynamic search suggestions as you type

### 📈 Interactive Visualizations
- **Knowledge Graph**: D3.js-powered network visualization showing relationships between organisms and research topics
- **Statistical Dashboards**: Real-time metrics on research distribution
- **Progress Indicators**: Visual representation of research coverage

### 💡 AI Insights Engine
- **Pattern Discovery**: Identifies research trends and focus areas
- **Gap Analysis**: Highlights understudied areas requiring attention
- **Cross-Species Analysis**: Reveals unexpected research distributions
- **Emerging Trends**: Detects shifts in research priorities

## 🛠️ Technologies Used

- **Frontend**: React 18 with Hooks
- **Styling**: Tailwind CSS with glassmorphism effects
- **Data Visualization**: D3.js for knowledge graphs
- **Data Processing**: Papa Parse for CSV handling
- **Icons**: Lucide React
- **AI/ML**: Custom semantic search algorithms with fuzzy matching

## 📋 Prerequisites

- Modern web browser (Chrome, Firefox, Safari, Edge)
- CSV file with NASA publications data (`SB_publication_PMC.csv`)
- No installation required - runs in browser

## 🚀 Getting Started

1. **Load the Application**
   - Open the application in your browser
   - The CSV file will be automatically loaded

2. **Explore the Dashboard**
   - View publication statistics
   - See top organisms and research topics
   - Review AI-generated insights

3. **Use AI Search**
   - Click the "Enable AI" button
   - Try natural language queries
   - Use suggested search terms
   - Filter by category, organism, or topic

4. **Explore the Knowledge Graph**
   - Navigate to the Knowledge Graph tab
   - Drag nodes to explore relationships
   - Zoom in/out for different perspectives
   - Node size indicates publication frequency

## 📝 Sample Searches

Try these example queries to see the AI search in action:

- `bone loss in space` - Find bone density research
- `how do plants grow without gravity?` - Natural language query
- `ISS experiments on bacteria` - Multi-term search
- `microgravity effects on human health` - Comprehensive health search
- `radiation exposure studies` - Topic-specific search

## 📊 Data Structure

The application processes publication data with the following structure:

```javascript
{
  id: 1,
  title: "Publication Title",
  link: "https://www.ncbi.nlm.nih.gov/pmc/articles/...",
  organisms: ["mice", "human"],
  topics: ["microgravity", "bone"],
  category: "Mammalian Studies",
  year: 2023,
  relevanceScore: 0.85
}
```

## 🎯 Key Insights from Data

- **607** total publications analyzed
- **Plants** are the most studied organisms (12.5%)
- **Spaceflight** is the dominant research topic (23.6%)
- Only **3%** of studies examine multi-generational effects
- **40%** increase in multi-system biology studies recently

## 🔧 Features Breakdown

### Dashboard View
- Real-time statistics cards
- Top organisms and topics charts
- AI-generated insights preview
- Quick search examples

### Publications View
- Searchable list of all publications
- AI relevance ranking
- Category and tag filtering
- Direct PubMed Central links

### Knowledge Graph
- Force-directed graph visualization
- Color-coded nodes (organisms vs topics)
- Interactive exploration
- Relationship strength indicators

### Insights View
- Pattern discoveries
- Research gap identification
- Confidence scoring
- Impact assessment

### Research Gaps
- Understudied organisms list
- Cross-domain opportunities
- Emerging research priorities

## 🤝 Contributing

This project was created for the NASA Space Apps Challenge 2025. To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 Data Source

Publication data sourced from:
- **NASA GeneLab**
- **PubMed Central**
- **NASA Open Science Data Repository**

## 🏆 NASA Space Apps Challenge 2025

This project addresses the challenge of making NASA's decades of space biology research accessible and actionable through:

- **Scalable Architecture**: Handles hundreds of publications efficiently
- **AI Innovation**: Semantic search goes beyond simple keyword matching
- **User-Centric Design**: Intuitive interface for various user types
- **Actionable Insights**: Identifies research gaps and opportunities

## 🙏 Acknowledgments

- NASA for providing open access to space biology research
- NASA Space Apps Challenge organizers
- The global space research community

## 📧 Contact

For questions or feedback about the Space Biology Knowledge Engine, please open an issue in the repository.

---

**Built with 💙 for NASA Space Apps Challenge 2025**

*Making space biology research accessible to everyone, everywhere.*
