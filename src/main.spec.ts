import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

jest.mock('@nestjs/core', () => ({
    NestFactory: {
        create: jest.fn(),
    },
}));

describe('Bootstrap', () => {
    let listenMock: jest.Mock;

    beforeAll(() => {
        listenMock = jest.fn();
        (NestFactory.create as jest.Mock).mockResolvedValue({
            listen: listenMock,
        });
    });

    it('should create the app and listen on port 3000', async () => {
        const { bootstrap } = await import('./main');
        await bootstrap();

        expect(NestFactory.create).toHaveBeenCalledWith(AppModule);
        expect(listenMock).toHaveBeenCalledWith(3000);
    });
});
