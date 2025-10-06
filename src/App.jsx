import React, { useState, useEffect, useMemo } from 'react';
import {
  Search,
  Database,
  Brain,
  Microscope,
  Dna,
  Rocket,
  TrendingUp,
  Filter,
  Download,
  Share2,
  AlertCircle,
  ChevronRight,
  Users,
  Calendar,
  Globe,
  Activity,
  Lightbulb,
  Network,
  BarChart3,
  FileText,
  Star,
  BookOpen,
  ExternalLink,
  Loader,
} from 'lucide-react';
import * as d3 from 'd3';
import Papa from 'papaparse';

export function App(props) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedExperiment, setSelectedExperiment] = useState(null);
  const [filters, setFilters] = useState({
    mission: 'all',
    organism: 'all',
    year: 'all',
    category: 'all',
  });

  // Mock data representing space biology experiments
  const experiments = [
    {
      id: 1,
      title: 'Microbial Gene Expression in Microgravity',
      mission: 'ISS Expedition 68',
      year: 2023,
      organism: 'E. coli',
      category: 'Microbiology',
      findings:
        'Significant upregulation of stress response genes in microgravity conditions',
      relevance: 0.95,
      citations: 42,
      tags: ['gene expression', 'microgravity', 'stress response', 'bacteria'],
    },
    {
      id: 2,
      title: 'Bone Density Changes in Long-Duration Spaceflight',
      mission: 'ISS Expedition 65',
      year: 2021,
      organism: 'Homo sapiens',
      category: 'Human Physiology',
      findings:
        '1-2% monthly bone loss in weight-bearing bones during extended missions',
      relevance: 0.98,
      citations: 128,
      tags: [
        'bone density',
        'human health',
        'long-duration',
        'countermeasures',
      ],
    },
    {
      id: 3,
      title: 'Plant Growth Orientation Without Gravity',
      mission: 'SpaceX CRS-25',
      year: 2022,
      organism: 'Arabidopsis thaliana',
      category: 'Plant Biology',
      findings:
        'Plants use light cues to establish growth direction in absence of gravity',
      relevance: 0.87,
      citations: 56,
      tags: ['plant growth', 'phototropism', 'microgravity adaptation'],
    },
    {
      id: 4,
      title: 'Tardigrade Survival in Space Vacuum',
      mission: 'FOTON-M3',
      year: 2020,
      organism: 'Tardigrades',
      category: 'Extremophiles',
      findings: '68% survival rate after 10 days exposure to space vacuum',
      relevance: 0.92,
      citations: 89,
      tags: ['extremophiles', 'space survival', 'radiation resistance'],
    },
    {
      id: 5,
      title: 'Muscle Atrophy Biomarkers in Astronauts',
      mission: 'ISS Expedition 67',
      year: 2023,
      organism: 'Homo sapiens',
      category: 'Human Physiology',
      findings:
        'Novel protein markers identified for early muscle degradation detection',
      relevance: 0.94,
      citations: 37,
      tags: ['muscle atrophy', 'biomarkers', 'human health', 'proteomics'],
    },
    {
      id: 6,
      title: 'Fungal Colony Morphology in Space',
      mission: 'ISS Expedition 64',
      year: 2021,
      organism: 'Aspergillus niger',
      category: 'Microbiology',
      findings:
        '3D hyphal growth patterns differ significantly from Earth controls',
      relevance: 0.82,
      citations: 24,
      tags: ['fungi', 'morphology', '3D growth', 'microgravity'],
    },
  ];

  // Knowledge graph nodes and links
  const knowledgeGraphData = {
    nodes: [
      { id: 'microgravity', group: 'environment', size: 30 },
      { id: 'radiation', group: 'environment', size: 25 },
      { id: 'bone_loss', group: 'effect', size: 20 },
      { id: 'muscle_atrophy', group: 'effect', size: 20 },
      { id: 'gene_expression', group: 'mechanism', size: 18 },
      { id: 'stress_response', group: 'mechanism', size: 15 },
      { id: 'humans', group: 'organism', size: 25 },
      { id: 'bacteria', group: 'organism', size: 20 },
      { id: 'plants', group: 'organism', size: 18 },
      { id: 'countermeasures', group: 'solution', size: 22 },
      { id: 'exercise', group: 'solution', size: 15 },
      { id: 'nutrition', group: 'solution', size: 15 },
    ],
    links: [
      { source: 'microgravity', target: 'bone_loss', value: 3 },
      { source: 'microgravity', target: 'muscle_atrophy', value: 3 },
      { source: 'microgravity', target: 'gene_expression', value: 2 },
      { source: 'radiation', target: 'gene_expression', value: 2 },
      { source: 'bone_loss', target: 'humans', value: 3 },
      { source: 'muscle_atrophy', target: 'humans', value: 3 },
      { source: 'gene_expression', target: 'bacteria', value: 2 },
      { source: 'gene_expression', target: 'plants', value: 2 },
      { source: 'stress_response', target: 'bacteria', value: 2 },
      { source: 'countermeasures', target: 'bone_loss', value: 2 },
      { source: 'exercise', target: 'muscle_atrophy', value: 2 },
      { source: 'nutrition', target: 'bone_loss', value: 1 },
    ],
  };

  // AI-generated insights
  const insights = [
    {
      id: 1,
      type: 'Pattern Discovery',
      title: 'Convergent Stress Responses Across Species',
      description:
        'Multiple organisms show similar oxidative stress pathways activation in space, suggesting universal adaptation mechanisms.',
      confidence: 0.89,
      impact: 'high',
    },
    {
      id: 2,
      type: 'Novel Hypothesis',
      title: 'Microgravity-Induced Epigenetic Changes',
      description:
        'Data patterns suggest heritable changes in gene expression that could persist after return to Earth gravity.',
      confidence: 0.76,
      impact: 'medium',
    },
    {
      id: 3,
      type: 'Research Gap',
      title: 'Limited Multi-Generational Studies',
      description:
        'Only 3% of experiments study organisms across multiple generations in space, limiting understanding of adaptation.',
      confidence: 0.94,
      impact: 'high',
    },
  ];

  // Filter experiments based on search and filters
  const filteredExperiments = useMemo(() => {
    return experiments.filter(exp => {
      const matchesSearch =
        searchQuery === '' ||
        exp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.findings.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exp.tags.some(tag =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesFilters =
        (filters.mission === 'all' || exp.mission.includes(filters.mission)) &&
        (filters.organism === 'all' || exp.organism === filters.organism) &&
        (filters.year === 'all' || exp.year.toString() === filters.year) &&
        (filters.category === 'all' || exp.category === filters.category);

      return matchesSearch && matchesFilters;
    });
  }, [searchQuery, filters]);

  // Dashboard component
  const Dashboard = () => (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8'>
      <div className='bg-gradient-to-br from-blue-900 to-purple-900 p-6 rounded-xl text-white'>
        <div className='flex items-center justify-between mb-4'>
          <Database className='w-8 h-8 opacity-80' />
          <TrendingUp className='w-5 h-5 text-green-400' />
        </div>
        <h3 className='text-3xl font-bold mb-1'>2,847</h3>
        <p className='text-blue-200'>Total Experiments</p>
        <p className='text-sm text-green-400 mt-2'>+12% this year</p>
      </div>

      <div className='bg-gradient-to-br from-purple-900 to-pink-900 p-6 rounded-xl text-white'>
        <div className='flex items-center justify-between mb-4'>
          <Microscope className='w-8 h-8 opacity-80' />
          <Activity className='w-5 h-5 text-yellow-400' />
        </div>
        <h3 className='text-3xl font-bold mb-1'>347</h3>
        <p className='text-purple-200'>Active Studies</p>
        <p className='text-sm text-yellow-400 mt-2'>23 new this month</p>
      </div>

      <div className='bg-gradient-to-br from-pink-900 to-red-900 p-6 rounded-xl text-white'>
        <div className='flex items-center justify-between mb-4'>
          <Dna className='w-8 h-8 opacity-80' />
          <Star className='w-5 h-5 text-yellow-400' />
        </div>
        <h3 className='text-3xl font-bold mb-1'>156</h3>
        <p className='text-pink-200'>Species Studied</p>
        <p className='text-sm text-yellow-400 mt-2'>82% show adaptations</p>
      </div>

      <div className='bg-gradient-to-br from-indigo-900 to-blue-900 p-6 rounded-xl text-white'>
        <div className='flex items-center justify-between mb-4'>
          <Brain className='w-8 h-8 opacity-80' />
          <Lightbulb className='w-5 h-5 text-green-400' />
        </div>
        <h3 className='text-3xl font-bold mb-1'>89</h3>
        <p className='text-indigo-200'>AI Insights Generated</p>
        <p className='text-sm text-green-400 mt-2'>15 high-impact</p>
      </div>
    </div>
  );

  // Knowledge Graph Visualization
  const KnowledgeGraph = () => {
    useEffect(() => {
      const width = 800;
      const height = 400;

      // Clear previous graph
      d3.select('#knowledge-graph').selectAll('*').remove();

      const svg = d3
        .select('#knowledge-graph')
        .append('svg')
        .attr('width', width)
        .attr('height', height)
        .attr('viewBox', [0, 0, width, height]);

      // Create force simulation
      const simulation = d3
        .forceSimulation(knowledgeGraphData.nodes)
        .force(
          'link',
          d3
            .forceLink(knowledgeGraphData.links)
            .id(d => d.id)
            .distance(80)
        )
        .force('charge', d3.forceManyBody().strength(-300))
        .force('center', d3.forceCenter(width / 2, height / 2));

      // Add links
      const link = svg
        .append('g')
        .selectAll('line')
        .data(knowledgeGraphData.links)
        .enter()
        .append('line')
        .attr('stroke', '#4a5568')
        .attr('stroke-opacity', 0.6)
        .attr('stroke-width', d => Math.sqrt(d.value));

      // Add nodes
      const node = svg
        .append('g')
        .selectAll('circle')
        .data(knowledgeGraphData.nodes)
        .enter()
        .append('circle')
        .attr('r', d => d.size)
        .attr('fill', d => {
          const colors = {
            environment: '#3182ce',
            effect: '#dc2626',
            mechanism: '#10b981',
            organism: '#8b5cf6',
            solution: '#f59e0b',
          };
          return colors[d.group] || '#6b7280';
        })
        .call(
          d3
            .drag()
            .on('start', dragstarted)
            .on('drag', dragged)
            .on('end', dragended)
        );

      // Add labels
      const label = svg
        .append('g')
        .selectAll('text')
        .data(knowledgeGraphData.nodes)
        .enter()
        .append('text')
        .text(d => d.id.replace(/_/g, ' '))
        .attr('font-size', 12)
        .attr('fill', 'white')
        .attr('text-anchor', 'middle')
        .attr('dy', 4);

      // Update positions
      simulation.on('tick', () => {
        link
          .attr('x1', d => d.source.x)
          .attr('y1', d => d.source.y)
          .attr('x2', d => d.target.x)
          .attr('y2', d => d.target.y);

        node.attr('cx', d => d.x).attr('cy', d => d.y);

        label.attr('x', d => d.x).attr('y', d => d.y);
      });

      function dragstarted(event, d) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
      }

      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
      }

      function dragended(event, d) {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
      }
    }, []);

    return <div id='knowledge-graph' className='w-full h-full'></div>;
  };

  return (
    <div className='min-h-screen bg-gradient-to-b from-gray-900 via-blue-900 to-black text-white'>
      {/* Header */}
      <header className='border-b border-blue-800/50 bg-black/50 backdrop-blur-xl sticky top-0 z-50'>
        <div className='max-w-7xl mx-auto px-6 py-4'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-4'>
              <div className='relative'>
                <Rocket className='w-10 h-10 text-blue-400' />
                <div className='absolute -inset-1 bg-blue-500 opacity-20 blur-lg rounded-full'></div>
              </div>
              <div>
                <h1 className='text-2xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                  Space Biology Knowledge Engine
                </h1>
                <p className='text-sm text-gray-400'>
                  NASA Space Apps Challenge 2025
                </p>
              </div>
            </div>
            <div className='flex items-center gap-4'>
              <button className='p-2 rounded-lg hover:bg-white/10 transition-colors'>
                <Download className='w-5 h-5' />
              </button>
              <button className='p-2 rounded-lg hover:bg-white/10 transition-colors'>
                <Share2 className='w-5 h-5' />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <nav className='max-w-7xl mx-auto px-6 py-4'>
        <div className='flex gap-2 flex-wrap'>
          {[
            'dashboard',
            'experiments',
            'knowledge-graph',
            'insights',
            'research-gaps',
          ].map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-4 py-2 rounded-lg transition-all ${
                activeTab === tab
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/50'
                  : 'bg-white/10 hover:bg-white/20 text-gray-300'
              }`}
            >
              {tab
                .split('-')
                .map(word => word.charAt(0).toUpperCase() + word.slice(1))
                .join(' ')}
            </button>
          ))}
        </div>
      </nav>

      {/* Search and Filters */}
      <div className='max-w-7xl mx-auto px-6 py-6'>
        <div className='bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10'>
          <div className='flex flex-col md:flex-row gap-4'>
            <div className='flex-1 relative'>
              <Search className='absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5' />
              <input
                type='text'
                placeholder='Search experiments, organisms, findings...'
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                className='w-full pl-10 pr-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 focus:ring-2 focus:ring-blue-400/20'
              />
            </div>
            <button className='px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium transition-colors flex items-center gap-2'>
              <Brain className='w-5 h-5' />
              AI Search
            </button>
          </div>

          {/* Quick Filters */}
          <div className='mt-4 flex flex-wrap gap-3'>
            <select
              value={filters.category}
              onChange={e =>
                setFilters({ ...filters, category: e.target.value })
              }
              className='px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white'
            >
              <option value='all'>All Categories</option>
              <option value='Microbiology'>Microbiology</option>
              <option value='Human Physiology'>Human Physiology</option>
              <option value='Plant Biology'>Plant Biology</option>
              <option value='Extremophiles'>Extremophiles</option>
            </select>

            <select
              value={filters.year}
              onChange={e => setFilters({ ...filters, year: e.target.value })}
              className='px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white'
            >
              <option value='all'>All Years</option>
              <option value='2023'>2023</option>
              <option value='2022'>2022</option>
              <option value='2021'>2021</option>
              <option value='2020'>2020</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className='max-w-7xl mx-auto px-6 pb-12'>
        {activeTab === 'dashboard' && (
          <>
            <Dashboard />

            {/* Recent Experiments */}
            <div className='bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 mb-8'>
              <h2 className='text-xl font-bold mb-6 flex items-center gap-2'>
                <Microscope className='w-6 h-6 text-blue-400' />
                Recent High-Impact Experiments
              </h2>
              <div className='space-y-4'>
                {filteredExperiments.slice(0, 3).map(exp => (
                  <div
                    key={exp.id}
                    className='p-4 bg-white/5 rounded-lg hover:bg-white/10 transition-colors cursor-pointer'
                    onClick={() => setSelectedExperiment(exp)}
                  >
                    <div className='flex justify-between items-start'>
                      <div className='flex-1'>
                        <h3 className='font-semibold text-lg mb-1'>
                          {exp.title}
                        </h3>
                        <p className='text-gray-400 text-sm mb-2'>
                          {exp.mission} • {exp.year}
                        </p>
                        <p className='text-gray-300'>{exp.findings}</p>
                        <div className='flex gap-2 mt-3'>
                          {exp.tags.slice(0, 3).map((tag, i) => (
                            <span
                              key={i}
                              className='px-2 py-1 bg-blue-600/20 text-blue-400 text-xs rounded'
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      </div>
                      <div className='text-right ml-4'>
                        <div className='text-2xl font-bold text-green-400'>
                          {(exp.relevance * 100).toFixed(0)}%
                        </div>
                        <p className='text-xs text-gray-400'>Relevance</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Insights Preview */}
            <div className='bg-gradient-to-r from-purple-900/20 to-blue-900/20 rounded-xl p-6 border border-purple-500/30'>
              <h2 className='text-xl font-bold mb-6 flex items-center gap-2'>
                <Lightbulb className='w-6 h-6 text-yellow-400' />
                Latest AI-Generated Insights
              </h2>
              <div className='grid md:grid-cols-3 gap-4'>
                {insights.map(insight => (
                  <div key={insight.id} className='bg-white/5 rounded-lg p-4'>
                    <div className='flex items-center gap-2 mb-2'>
                      <span
                        className={`px-2 py-1 text-xs rounded ${
                          insight.impact === 'high'
                            ? 'bg-red-600/20 text-red-400'
                            : 'bg-yellow-600/20 text-yellow-400'
                        }`}
                      >
                        {insight.impact.toUpperCase()} IMPACT
                      </span>
                      <span className='text-xs text-gray-400'>
                        {insight.type}
                      </span>
                    </div>
                    <h3 className='font-semibold mb-2'>{insight.title}</h3>
                    <p className='text-sm text-gray-300 mb-3'>
                      {insight.description}
                    </p>
                    <div className='flex items-center justify-between'>
                      <div className='text-xs text-gray-400'>
                        Confidence: {(insight.confidence * 100).toFixed(0)}%
                      </div>
                      <ChevronRight className='w-4 h-4 text-blue-400' />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === 'experiments' && (
          <div className='space-y-4'>
            {filteredExperiments.map(exp => (
              <div
                key={exp.id}
                className='bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10 hover:border-blue-500/50 transition-all cursor-pointer'
                onClick={() => setSelectedExperiment(exp)}
              >
                <div className='flex justify-between items-start'>
                  <div className='flex-1'>
                    <h3 className='text-xl font-semibold mb-2'>{exp.title}</h3>
                    <div className='flex gap-4 text-sm text-gray-400 mb-3'>
                      <span className='flex items-center gap-1'>
                        <Calendar className='w-4 h-4' />
                        {exp.year}
                      </span>
                      <span className='flex items-center gap-1'>
                        <Rocket className='w-4 h-4' />
                        {exp.mission}
                      </span>
                      <span className='flex items-center gap-1'>
                        <Dna className='w-4 h-4' />
                        {exp.organism}
                      </span>
                      <span className='flex items-center gap-1'>
                        <FileText className='w-4 h-4' />
                        {exp.citations} citations
                      </span>
                    </div>
                    <p className='text-gray-300 mb-4'>{exp.findings}</p>
                    <div className='flex gap-2'>
                      {exp.tags.map((tag, i) => (
                        <span
                          key={i}
                          className='px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full'
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className='ml-6 text-center'>
                    <div className='w-20 h-20 rounded-full bg-gradient-to-br from-green-500 to-blue-500 flex items-center justify-center'>
                      <span className='text-2xl font-bold'>
                        {(exp.relevance * 100).toFixed(0)}%
                      </span>
                    </div>
                    <p className='text-xs text-gray-400 mt-2'>Relevance</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'knowledge-graph' && (
          <div className='bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10'>
            <h2 className='text-xl font-bold mb-6 flex items-center gap-2'>
              <Network className='w-6 h-6 text-blue-400' />
              Space Biology Knowledge Graph
            </h2>
            <div
              className='bg-black/30 rounded-lg p-4'
              style={{ height: '450px' }}
            >
              <KnowledgeGraph />
            </div>
            <div className='mt-6 grid grid-cols-5 gap-4'>
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 rounded-full bg-blue-500'></div>
                <span className='text-sm'>Environment</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 rounded-full bg-red-500'></div>
                <span className='text-sm'>Effects</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 rounded-full bg-green-500'></div>
                <span className='text-sm'>Mechanisms</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 rounded-full bg-purple-500'></div>
                <span className='text-sm'>Organisms</span>
              </div>
              <div className='flex items-center gap-2'>
                <div className='w-4 h-4 rounded-full bg-yellow-500'></div>
                <span className='text-sm'>Solutions</span>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'insights' && (
          <div className='space-y-6'>
            <div className='bg-gradient-to-r from-yellow-900/20 to-orange-900/20 rounded-xl p-6 border border-yellow-500/30'>
              <div className='flex items-center gap-3 mb-4'>
                <Brain className='w-8 h-8 text-yellow-400' />
                <div>
                  <h2 className='text-2xl font-bold'>
                    AI-Powered Insights Engine
                  </h2>
                  <p className='text-gray-400'>
                    Discovering patterns and generating hypotheses from decades
                    of space biology data
                  </p>
                </div>
              </div>
            </div>

            {insights.map(insight => (
              <div
                key={insight.id}
                className='bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10'
              >
                <div className='flex items-start justify-between mb-4'>
                  <div className='flex items-center gap-3'>
                    <div
                      className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                        insight.type === 'Pattern Discovery'
                          ? 'bg-blue-600/20'
                          : insight.type === 'Novel Hypothesis'
                          ? 'bg-purple-600/20'
                          : 'bg-orange-600/20'
                      }`}
                    >
                      {insight.type === 'Pattern Discovery' && (
                        <BarChart3 className='w-6 h-6 text-blue-400' />
                      )}
                      {insight.type === 'Novel Hypothesis' && (
                        <Lightbulb className='w-6 h-6 text-purple-400' />
                      )}
                      {insight.type === 'Research Gap' && (
                        <AlertCircle className='w-6 h-6 text-orange-400' />
                      )}
                    </div>
                    <div>
                      <p className='text-sm text-gray-400'>{insight.type}</p>
                      <h3 className='text-xl font-semibold'>{insight.title}</h3>
                    </div>
                  </div>
                  <span
                    className={`px-3 py-1 text-sm rounded-full ${
                      insight.impact === 'high'
                        ? 'bg-red-600/20 text-red-400'
                        : 'bg-yellow-600/20 text-yellow-400'
                    }`}
                  >
                    {insight.impact.toUpperCase()} IMPACT
                  </span>
                </div>
                <p className='text-gray-300 mb-4'>{insight.description}</p>
                <div className='flex items-center justify-between'>
                  <div className='flex items-center gap-4'>
                    <div className='text-sm'>
                      <span className='text-gray-400'>Confidence Score: </span>
                      <span className='font-semibold'>
                        {(insight.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                    <div className='w-32 h-2 bg-white/10 rounded-full overflow-hidden'>
                      <div
                        className='h-full bg-gradient-to-r from-blue-500 to-green-500'
                        style={{ width: `${insight.confidence * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <button className='text-blue-400 hover:text-blue-300 text-sm flex items-center gap-1'>
                    Explore Further <ChevronRight className='w-4 h-4' />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'research-gaps' && (
          <div className='space-y-6'>
            <div className='bg-gradient-to-r from-red-900/20 to-pink-900/20 rounded-xl p-6 border border-red-500/30'>
              <div className='flex items-center gap-3 mb-4'>
                <AlertCircle className='w-8 h-8 text-red-400' />
                <div>
                  <h2 className='text-2xl font-bold'>Critical Research Gaps</h2>
                  <p className='text-gray-400'>
                    Areas requiring immediate attention for advancing space
                    biology
                  </p>
                </div>
              </div>
            </div>

            <div className='grid md:grid-cols-2 gap-6'>
              <div className='bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10'>
                <h3 className='text-lg font-semibold mb-4 text-red-400'>
                  Understudied Areas
                </h3>
                <div className='space-y-3'>
                  <div className='flex items-center justify-between p-3 bg-white/5 rounded-lg'>
                    <span>Reproductive Biology in Space</span>
                    <span className='text-red-400 text-sm'>
                      Only 12 studies
                    </span>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-white/5 rounded-lg'>
                    <span>Microbiome Dynamics</span>
                    <span className='text-orange-400 text-sm'>23 studies</span>
                  </div>
                  <div className='flex items-center justify-between p-3 bg-white/5 rounded-lg'>
                    <span>Psychological Adaptations</span>
                    <span className='text-yellow-400 text-sm'>31 studies</span>
                  </div>
                </div>
              </div>

              <div className='bg-white/5 backdrop-blur-lg rounded-xl p-6 border border-white/10'>
                <h3 className='text-lg font-semibold mb-4 text-blue-400'>
                  Emerging Priorities
                </h3>
                <div className='space-y-3'>
                  <div className='p-3 bg-white/5 rounded-lg'>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='font-medium'>
                        Mars Gravity Simulation
                      </span>
                      <TrendingUp className='w-4 h-4 text-green-400' />
                    </div>
                    <p className='text-sm text-gray-400'>
                      Critical for Mars mission planning
                    </p>
                  </div>
                  <div className='p-3 bg-white/5 rounded-lg'>
                    <div className='flex items-center justify-between mb-2'>
                      <span className='font-medium'>
                        Closed-Loop Life Support
                      </span>
                      <TrendingUp className='w-4 h-4 text-green-400' />
                    </div>
                    <p className='text-sm text-gray-400'>
                      Essential for long-duration missions
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Experiment Detail Modal */}
        {selectedExperiment && (
          <div
            className='fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-6 z-50'
            onClick={() => setSelectedExperiment(null)}
          >
            <div
              className='bg-gray-900 rounded-xl p-8 max-w-2xl w-full border border-blue-500/30'
              onClick={e => e.stopPropagation()}
            >
              <h2 className='text-2xl font-bold mb-4'>
                {selectedExperiment.title}
              </h2>
              <div className='grid grid-cols-2 gap-4 mb-6'>
                <div>
                  <p className='text-gray-400 text-sm'>Mission</p>
                  <p className='font-semibold'>{selectedExperiment.mission}</p>
                </div>
                <div>
                  <p className='text-gray-400 text-sm'>Year</p>
                  <p className='font-semibold'>{selectedExperiment.year}</p>
                </div>
                <div>
                  <p className='text-gray-400 text-sm'>Organism</p>
                  <p className='font-semibold'>{selectedExperiment.organism}</p>
                </div>
                <div>
                  <p className='text-gray-400 text-sm'>Citations</p>
                  <p className='font-semibold'>
                    {selectedExperiment.citations}
                  </p>
                </div>
              </div>
              <div className='mb-6'>
                <p className='text-gray-400 text-sm mb-2'>Key Findings</p>
                <p className='text-lg'>{selectedExperiment.findings}</p>
              </div>
              <div className='flex gap-2 mb-6'>
                {selectedExperiment.tags.map((tag, i) => (
                  <span
                    key={i}
                    className='px-3 py-1 bg-blue-600/20 text-blue-400 text-sm rounded-full'
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <div className='flex gap-3'>
                <button className='flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors'>
                  View Full Paper
                </button>
                <button className='flex-1 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors'>
                  Related Studies
                </button>
                <button
                  className='px-4 py-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors'
                  onClick={() => setSelectedExperiment(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Log to console
console.log('Hello console');
