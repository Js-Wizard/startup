# CS 260 notes

These are notes from the CS 260 course that I will be able to use on exams.

## GitHub

Git is a version control software that has several crucial features for code development, such as:
- Keeping track of changes to code, so that older versions can be restored if needed
- Creating branches to experiment with new features without ruining anything
- Transferring code and changes between devices to facilitate collaboration

GitHub is a cloud-based service that enhances Git with additional features:
- Storing repositories in a central and publicly accessible location
- Advanced project management
- Pull requests, which enable community collaboration
- Fork someone else's repository to make your own version of it, to experiment or contribute
- and more

To create a Git repository with GitHub:
1. Create repository in GitHub
2. Copy clone URL
3. Paste into command line after `git clone` when in the desired location

To modify from development environment:
1. `git pull` to get latest version from GitHub
2. Modify files as desired
3. `git add` on modified files to apply changes to
4. `git commit -m "(message)"` to locally commit changes
5. Repeat 2-4 for each major set of changes
6. `git push` to apply to GitHub repository

Other Git commands:
- `git fetch` updates cache with information about the state of the GitHub repository
- `git status` evaluates difference between GitHub cache and local files

GitHub .md files use _markdown_, which is syntax to represent visual elements applied to the text.

## Internet

- Layers (TCP/IP model)
  - Application
    - For example, HTTPS
    - Application implementation
  - Transport
    - For example, TCP/UDP
    - Creates stable connections and ensures data reaches its destination
  - Internet
    - IP
    - Sends data between systems
    - Use `traceroute` to get points along route to a certain address
  - Link
    - Fiber, hardware
    - Phyically connects machines
- Protocols
  - Application
    - HTTP
      - Original web application protocol
      - Use `curl` to make an HTTP request
    - HTTPS
      - HTTP but secure
      - Uses TLS
      - `curl -v` will show TLS handshake
    - TLS
      - Wrapper for transport layer that encrypts sent data

## Tools

### DNS

- Register IP address corresponding to the server
- Commands
  - Run `dig` to get ip address of domain from DNS
  - Run `whois` to get informatino about the owner of a domain
- TLD: top level domain
  - Rightmost
  - e.g. com, edu
  - Managed by ICANN
- Secondary domain
  - Second-to-rightmost
  - Managed by authoritative name servers
- Subdomains
  - Third, fourth, etc
  - Managed by owner of a root domain
- Root domain: secondary domain + TLD
- DNS records:
  - A: ip address corresponding to a domain name
  - NS: authoritative name servers that are listed in the registrar
  - SOA: contact information for owner

### Gateway
- Redirects inputs to specific services
- Our tool: Caddy
  - Serves static files directly
  - Sends service requests to specific services
- Services are linked to subdomains

### Web certificate issuer
- Generates and issues TLS certificates
- Let's Encrypt does this for free and is used by Caddy

### HTML
- Hyper Text Markup Language
- Elements
  - Structure:
    - Open tag
      - `<name att="val" ...>`
      - May contain attributes
    - Content
      - Between opening and closing tag
    - Closing tag
      - `</name>`
      - Can put in opening tag: `<name ... />`
  - Types:
    - `<!DOCTYPE html>`
      - Notifies browser that this uses the new version of HTML
    - `<html>`
      - Root of DOM
      - `lang`: Page language
    - `<head>`
      - Metadata container
    - `<meta>`
      - Metadata element
    - `<title>`
      - Sets name of browser tab
    - `<link>`
      - Used in `head` to reference tab icon
    - `<body>`
      - Actual website content
    - `<header>`
      - Beginning website section
    - `<main>`
      - Main website section
    - `<footer>`
      - End website section
    - `<h1>`
      - Top-level section header
    - `<h2>`
      - Sublevel section header, can go up to `<h9>`
    - `<div>`
      - Generic page element, containing other elements
      - `class`: Mark as type for CSS
    - `<nav>`
      - Container for navigation elements
    - `<menu>`
      - Container for menu elements
    - `<p>`
      - Paragraph element
    - `<li>`
      - List item
    - `<a>`
      - Hyperlink
      - `href`: relative path or URL of referenced page
    - `<img>`
      - `alt`: Name of image, used if picture cannot be seen
      - `src`: URL of source image
    - `<sup>`
      - Superscript
    - `<hr>`
      - Horizontal line
    - `<form>`
      - Contains input elements
    - `<label>`
      - Text object connected to another element
    - `<input>`
      - Input element, such as text box
    - `<button>`
      - A button that can cause an action to happen
    - `<br>`
      - Line break
    - `<span>`
      - Inline element, only as big as its contents
    - `<ul>`
      - Unordered list
    - `<table>`
      - Table element
      - `<tr>`
        - Row
      - `<td>`
        - Element in row
    - `<svg>`
      - Vector graphic
    - `<!-- Comment -->`
      - Displays a comment
- Escape character: `&`
  - Used for reserved and Unicode characters
- DOM
  - Document Object Model
  - Tree structure representing relationship between elements
  - Can represent HTML, CSS, Javascript
  - Defined by code
- Input
  - Can use `<form>` element or JavaScript
  - `<form>` will send data to server, not necessary in all cases
  - `<input>` element supports several types of input methods
    - Use `type` attribute to choose type
    - Use other attributes for options for that type
    - Common attributes:
      - `name`
      - `disabled`
      - `value`
      - `required`
- For further information
  - MDN WebDocs
  - w3schools

### CSS

- Cascading Style Sheets
- Styles HTML elements
- Applies `style` attribute to several elements
- Basically, a list of rules
- Rule structure:
  - Selector
  - In braces:
    - Any number of declarations; for each:
      - Property
      - (colon)
      - Value
      - (semicolon)
- For example:
```
p {
    color: red;
}
```
- Ways to use
  - Can be inserted directly in HTML with `style` attribute on any element
  - Can add `<style>` to `<head>` with CSS in it
  - Can add `<link>` to `<head>` referencing CSS file
    - `<link rel="stylesheet" href="styles.css"/>`
- Precedence
  - Location
    - `style` attribute
    - `<style>` element
    - `<link>` element
  - Inheritance
    - Rules cascade down HTML inheritance
    - Child element selector overrides parent selector
- Selectors
  - Element: corresponds to all HTML elements of that type
    - `p`
  - ID: element with specific ID
    - `#id`
  - Class: all HTML elements with certain class attribute
    - `.class`
  - Element+Class: all HTML elements with specific element type and class attribute
    - `p.class`
  - Attribute: elements with specific element type and certain atribute, optionally with specific attribute value
    - `p[att]`
    - `p[att=val]`
  - List: any among multiple selectors
    - `selector1, selector2, selector3`
  - Descendant: selector with added requirement of being descendant of a specific element type
    - `div p`
  - Child: selector with added requirement of being a direct child of a specific element type
    - `div > p`
  - General sibling: selector must have a certain sibling
    - `p ~ div`
  - Adjacent sibling: selector must have a certain adjacent sibling
    - `p + div`
  - Pseudo: selector with state-based requirement
    - `p:action`
- Declarations
  - Properties
    - `color`: Set color
    - `float`: Alignment within parent, text goes around
    - `display`: Space-filling rules
      - none: does not display
      - block: inherits parent width
      - inline: only as big as content
      - flex: children will be spread across interior
      - grid: children are placed into a grid
    - `flex`: Flex parameters when parent has flex display
      - First number is share of the remaining width/height that that element gets
      - Second number is a fixed amount reserved for that element
    - `font-family`: Type of font
    - `font-size`: Font size
  - Units
    - px
    - pt
    - %
    - em
    - rem
    - vw
    - vh
    - vmin
    - vmax
  - Colors
    - Keyword
      - `red`
    - Hex
      - `#FFFFFF`
      - `#FFFFFFFF`
    - RGB
      - `rgb(r, g, b)`
      - `rgb(r, g, b, a)`
    - HSL
      - `hsl(h, s, l)`
      - `hsl(h, s, l, a)`
- Box model
  - Content
  - Surrounded by padding
  - Surrounded by border
  - Surrounded by margin
    - Separates from other elements
- Fonts
  - Use good fonts
How to import from internal source:
```
@font-face {
 font-family: 'FontName';
 src: url('https://font-location');
}
```
How to import from external source:
```
@import
url("https://font-location");
```
- Animation
  - Create animation with `@keyframes`
    - Start with `from`
    - Middle keyframes with `50%` or similar
    - End with `to`
  - Attach animation with `animation-name`
  - Specify duration with `animation-duration`
- Reactive design
  - Make content change depending on device / dimensions / page position
  - To prevent mobile-specific changes, use `<meta>` element with default settings
    - `<meta name="viewport" content="width=device-width, initial-scale=1"/>`
  - To condition rules on device status, use `@media` query
- Frameworks
  - Packages to make CSS faster by simplifying common patterns
  - To include, use external stylesheet in link and include javascript file in body
  - To use, add special class names to specific elements
  - Example: Bootstrap
 
### Javascript
- Makes websites interactive
- How to add to HTML
  - Use `<script>` element pointing to external file
  - Use `<script>` element with JS content
  - Put into script attribute, such as `onclick` of `<button>` element
- Print messages
  - `console.log`
  - `alert`
  - Change HTML
- Breakpoints
  - `debugger;`
  - Will stop there and pull up sources tab in debug

## Startup

- Access
  - Public IP: 54.164.246.196
  - Domain: fimgame.click
  - SSH: `ssh -i ~/CS260/demokey260.pem ubuntu@fimgame.click`
- Deployment
  - Simon
    - Clone into temp directory
    - Make sure in simon directory
    - Run `./deployFiles.sh -k <pem file> -h fimgame.click -s simon`
  - Startup
    - Commit and push all changes
    - Make sure in startup directory
    - Run `./deployFiles.sh -k <pem file> -h fimgame.click -s startup`
