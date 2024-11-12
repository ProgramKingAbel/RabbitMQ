const amqp = require("amqplib");

connect();
async function connect() {
    try {
        const connection = await amqp.connect("amqp://localhost:5672")
        const channel = await connection.createChannel();

        const result = await channel.assertQueue("jobs");

        channel.consume("jobs", message => {
            const input = JSON.parse(message.content.toString())
            console.log(`Received job with ${input.number}`)

            if (input.number === "7") { // a check if operation is complete
                channel.ack(message)
            }
        })
        // Keep consumer alive
        console.log("Waiting for messages...")

       
    } 
    catch(ex) {
        console.error(ex)
    }
}