const home = (req, res) => {
    const HOME = "SUST CAFETERIA"
    res.end(`
<!DOCTYPE html>
<html>
<head>
<style>
body{
    height:100vh;
    display:flex;
    justify-content:center;
    align-items:center;
    margin:0;
    font-family:Arial;
}
</style>
</head>

<body>
    <h1>${HOME}</h1>
</body>
</html>
`);
};

export default home;
