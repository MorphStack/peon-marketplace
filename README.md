# Castle Ops - Peon Marketplace

[![Validation](https://github.com/MorphStack/peon-marketplace/actions/workflows/ci.yml/badge.svg)](https://github.com/MorphStack/peon-marketplace/actions/workflows/ci.yml)

This repository contains the official marketplace of approved Peons for use with Castle Ops. It provides automated validation of Peon configurations to ensure consistency and reliability across the ecosystem.

## What is a Peon?

A Peon is a lightweight automation script designed to perform specific tasks in your home infrastructure. Peons can be written in various languages (PowerShell, Python, Bash, etc.) and are designed to be portable, reusable, and easily deployable.

## 🚀 Quick Start

### For Peon Developers

Want to contribute a Peon to the marketplace? Follow these steps:

## 📦 Contributing a Peon

### 1. Create Your Peon Repository

Create a new repository for your Peon with the following structure:

```
your-peon-repo/
├── peon.yaml          # Required: Peon configuration
├── README.md          # Documentation
├── your-script.ps1    # Your main script
└── tests/             # Optional: Tests for your Peon
```

### 2. Add peon.yaml Configuration

Include a `peon.yaml` file at the root level of your repository:

```yaml
peon:
  version: 0.1.0
  description: My Peon Description.
  author: MorphStack
  tags: [healthcheck, monitoring, ping]
  giturl: https://github.com/MorphStack/peon-ping-windows
  type: powershell
  entrypoint: ./ping.ps1
  environment:
    PING_DEVICE: ""
    PING_COUNT: "4"
  requirements:
    os: ["windows"]
    dependencies: []
```

#### Configuration Fields

| Field | Required | Description |
|-------|----------|-------------|
| `version` | ✅ | Semantic version of your Peon |
| `description` | ✅ | Clear description of what your Peon does |
| `author` | ✅ | Author or organization name |
| `tags` | ✅ | Array of relevant tags for categorization |
| `giturl` | ✅ | GitHub repository URL |
| `type` | ✅ | Script type: `powershell`, `python`, `bash`, `nodejs` |
| `entrypoint` | ✅ | Main script file to execute |
| `environment` | ⚠️ | Environment variables with default values |
| `requirements.os` | ⚠️ | Supported operating systems |
| `requirements.dependencies` | ⚠️ | External dependencies required |

### 3. Test Your Configuration

Use our validation workflow to test your `peon.yaml`:

```bash
# Clone this repository
git clone https://github.com/MorphStack/peon-marketplace.git
cd peon-marketplace

# Install dependencies
npm install

# Test your peon.yaml URL
npm run validate-url https://github.com/your-username/your-peon-repo
```

### 4. Submit to Marketplace

Once validated, add your Peon to the marketplace:

1. Fork this repository
2. Edit `config/peon-marketplace.json`
3. Add your Peon entry:

```json
{
    "name": "your-peon-name",
    "author": "YourName",
    "type": "powershell",
    "os": ["windows", "linux"],
    "url": "https://github.com/your-username/your-peon-repo",
    "description": "Brief description of your Peon"
}
```

4. Open a Pull Request
5. Wait for automated validation and approval

## 🔧 Development

### Prerequisites

- Node.js 18+ 
- npm or yarn
- TypeScript

### Setup

```bash
# Clone the repository
git clone https://github.com/MorphStack/peon-marketplace.git
cd peon-marketplace

# Install dependencies
npm install

# Build the project
npm run build
```

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run build` | Compile TypeScript to JavaScript |
| `npm run validate` | Validate the marketplace configuration |
| `npm run dev` | Run validation in development mode |
| `npm start` | Run the compiled validation script |
| `npm run lint` | Run ESLint to check for code issues |
| `npm run lint:fix` | Run ESLint with auto-fix for formatting |
| `npm run format` | Format code with Prettier |
| `npm run format:check` | Check if code is properly formatted |
| `npm run type-check` | Run TypeScript type checking without compilation |
| `npm test` | Run all checks: type checking, linting, and formatting |

### Validation Rules

The marketplace validator checks:

- ✅ **Name & Author**: Must exist and be ≤ 65 characters
- ✅ **Repository URL**: Must be accessible and return HTTP 2xx/3xx
- ✅ **peon.yaml**: Must exist in the repository root and be valid YAML
- ✅ **Required Fields**: All mandatory fields in peon.yaml must be present
- ✅ **Format Consistency**: Follows the expected schema

## 📁 Repository Structure

```
peon-marketplace/
├── config/
│   └── peon-marketplace.json    # Main marketplace registry
├── src/
│   └── validate.ts              # Validation logic
├── dist/                        # Compiled JavaScript
├── .github/
│   └── workflows/
│       └── validate.yml         # CI/CD validation
├── package.json
├── tsconfig.json
└── README.md
```

## 🤝 Contributing Guidelines

### Code Style

- Use TypeScript for all new code
- Follow existing naming conventions
- Include proper type definitions
- Add comments for complex logic

### Pull Request Process

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes
4. Run validation: `npm run validate`
5. Commit with clear messages
6. Push and create a Pull Request

### Review Criteria

Pull requests are reviewed for:
- ✅ Automated validation passes
- ✅ Code quality and style
- ✅ Security considerations
- ✅ Documentation completeness
- ✅ Peon functionality and usefulness

## 📊 Marketplace Statistics

<!-- This section could be auto-generated -->
- **Total Peons**: 1
- **Languages**: PowerShell (1)
- **OS Support**: Windows (1)

## 🔒 Security

Security is a top priority for the Peon Marketplace:

- All Peon repositories are scanned for vulnerabilities
- Code review is required for all marketplace additions
- Automated validation prevents malicious configurations
- Regular audits of approved Peons

To report security issues, please email: security@morphstack.com

## 📄 License

This project is licensed under the ISC License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: Check this README and individual Peon repositories
- **Issues**: Open an issue in this repository
- **Community**: Join our [Discord community](https://discord.gg/morphstack)
- **Email**: support@morphstack.com

## 🗺️ Roadmap

- [ ] Web-based marketplace browser
- [ ] Automated testing framework for Peons
- [ ] Performance benchmarking
- [ ] Advanced search and filtering
- [ ] Peon dependency management
- [ ] Docker container support

---

**Built with ❤️ by the MorphStack team**